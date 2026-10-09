import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export const STORAGE_KEYS = {
  identity: 'pheu_data_identity',
  projects: 'pheu_data_projects',
  skills: 'pheu_data_skills',
  services: 'pheu_data_services',
  credentials: 'pheu_data_credentials',
  experience: 'pheu_data_experience',
  explorations: 'pheu_data_explorations',
}

function readLocalOverride(domain) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[domain])
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function throwIfError(error) {
  if (error) throw new Error(error.message || 'Erreur de synchronisation avec Supabase.')
}

export async function loadPortfolioData(baseData) {
  if (!isSupabaseConfigured) {
    return Object.fromEntries(
      Object.entries(baseData).map(([domain, value]) => [
        domain,
        readLocalOverride(domain) ?? value,
      ])
    )
  }

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('domain, content')
  throwIfError(error)

  const storedDomains = Object.fromEntries(data.map(row => [row.domain, row.content]))
  return Object.fromEntries(
    Object.entries(baseData).map(([domain, value]) => [
      domain,
      Object.hasOwn(storedDomains, domain) ? storedDomains[domain] : value,
    ])
  )
}

export async function savePortfolioDomain(domain, content) {
  if (!isSupabaseConfigured) {
    localStorage.setItem(STORAGE_KEYS[domain], JSON.stringify(content))
    return
  }

  const { error } = await supabase
    .from('portfolio_content')
    .upsert({ domain, content, updated_at: new Date().toISOString() }, { onConflict: 'domain' })
  throwIfError(error)
}

export async function migrateLocalOverrides() {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('portfolio_content')
    .select('domain')
  throwIfError(error)

  const existingDomains = new Set(data.map(row => row.domain))
  const localRows = Object.keys(STORAGE_KEYS)
    .filter(domain => !existingDomains.has(domain))
    .map(domain => ({ domain, content: readLocalOverride(domain) }))
    .filter(row => row.content !== null)

  if (localRows.length === 0) return []

  const { error: saveError } = await supabase
    .from('portfolio_content')
    .upsert(localRows.map(row => ({ ...row, updated_at: new Date().toISOString() })), {
      onConflict: 'domain',
      ignoreDuplicates: true,
    })
  throwIfError(saveError)

  return localRows
}