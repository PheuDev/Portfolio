/* ============================================================
   usePortfolioData — Fusion données de base + modifications admin
   
   Stratégie :
   - Les données de base viennent des fichiers src/data/*.js
   - Les modifications faites via l'admin sont stockées dans localStorage
   - Au chargement, localStorage écrase les données de base si présent
   - En admin, on expose aussi des fonctions de mise à jour
   ============================================================ */

import { useState, useCallback } from 'react'

// Clés localStorage par domaine
export const STORAGE_KEYS = {
  identity:     'pheu_data_identity',
  projects:     'pheu_data_projects',
  skills:       'pheu_data_skills',
  services:     'pheu_data_services',
  credentials:  'pheu_data_credentials',
  experience:   'pheu_data_experience',
  explorations: 'pheu_data_explorations',
}

/* Lit une clé localStorage et parse le JSON, retourne null si absent/invalide */
function readStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/* Écrit dans localStorage */
function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/* Fusionne : localStorage prend la priorité sur les données de base */
function merge(baseData, storageKey) {
  const stored = readStorage(storageKey)
  return stored !== null ? stored : baseData
}

export function usePortfolioData(baseData) {
  const {
    identity:     baseIdentity,
    projects:     baseProjects,
    skills:       baseSkills,
    services:     baseServices,
    credentials:  baseCredentials,
    experience:   baseExperience,
    explorations: baseExplorations,
  } = baseData

  // État initialisé avec la fusion base + localStorage
  const [data, setData] = useState(() => ({
    identity:     merge(baseIdentity,     STORAGE_KEYS.identity),
    projects:     merge(baseProjects,     STORAGE_KEYS.projects),
    skills:       merge(baseSkills,       STORAGE_KEYS.skills),
    services:     merge(baseServices,     STORAGE_KEYS.services),
    credentials:  merge(baseCredentials,  STORAGE_KEYS.credentials),
    experience:   merge(baseExperience,   STORAGE_KEYS.experience),
    explorations: merge(baseExplorations, STORAGE_KEYS.explorations),
  }))

  /* Met à jour un domaine entier et persiste dans localStorage */
  const updateDomain = useCallback((domain, newValue) => {
    writeStorage(STORAGE_KEYS[domain], newValue)
    setData(prev => ({ ...prev, [domain]: newValue }))
  }, [])

  /* Met à jour un seul objet identity (cas particulier, ce n'est pas un tableau) */
  const updateIdentity = useCallback((updates) => {
    const updated = { ...data.identity, ...updates }
    updateDomain('identity', updated)
  }, [data.identity, updateDomain])

  /* Ajoute un élément dans un tableau de domaine */
  const addItem = useCallback((domain, item) => {
    const updated = [...data[domain], item]
    updateDomain(domain, updated)
  }, [data, updateDomain])

  /* Met à jour un élément par id dans un tableau de domaine */
  const updateItem = useCallback((domain, id, updates) => {
    const updated = data[domain].map(item =>
      item.id === id ? { ...item, ...updates } : item
    )
    updateDomain(domain, updated)
  }, [data, updateDomain])

  /* Supprime un élément par id */
  const removeItem = useCallback((domain, id) => {
    const updated = data[domain].filter(item => item.id !== id)
    updateDomain(domain, updated)
  }, [data, updateDomain])

  /* Bascule la visibilité d'un élément */
  const toggleVisibility = useCallback((domain, id) => {
    const updated = data[domain].map(item =>
      item.id === id ? { ...item, visible: !item.visible } : item
    )
    updateDomain(domain, updated)
  }, [data, updateDomain])

  /* Réinitialise un domaine aux données de base */
  const resetDomain = useCallback((domain) => {
    localStorage.removeItem(STORAGE_KEYS[domain])
    const base = {
      identity:     baseIdentity,
      projects:     baseProjects,
      skills:       baseSkills,
      services:     baseServices,
      credentials:  baseCredentials,
      experience:   baseExperience,
      explorations: baseExplorations,
    }
    setData(prev => ({ ...prev, [domain]: base[domain] }))
  }, [baseIdentity, baseProjects, baseSkills, baseServices, baseCredentials, baseExperience, baseExplorations])

  /* Réinitialise TOUT aux données de base */
  const resetAll = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
    setData({
      identity:     baseIdentity,
      projects:     baseProjects,
      skills:       baseSkills,
      services:     baseServices,
      credentials:  baseCredentials,
      experience:   baseExperience,
      explorations: baseExplorations,
    })
  }, [baseIdentity, baseProjects, baseSkills, baseServices, baseCredentials, baseExperience, baseExplorations])

  return {
    data,
    updateIdentity,
    updateDomain,
    addItem,
    updateItem,
    removeItem,
    toggleVisibility,
    resetDomain,
    resetAll,
  }
}
