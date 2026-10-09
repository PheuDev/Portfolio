/* ============================================================
   usePortfolioData — Fusion données de base + modifications admin
   
  Les fichiers src/data/*.js restent la base. Supabase devient la
  source partagée quand il est configuré ; sinon, localStorage sert
  toujours de stockage local pour le développement.
   ============================================================ */

import { useState, useCallback, useEffect, useRef } from 'react'
import {
  loadPortfolioData,
  migrateLocalOverrides as migrateLocalData,
  savePortfolioDomain,
  STORAGE_KEYS,
} from '@/data/portfolioRepository'
import { isSupabaseConfigured } from '@/lib/supabase'

export { STORAGE_KEYS }

export function usePortfolioData(sourceData) {
  const {
    identity:     baseIdentity,
    projects:     baseProjects,
    skills:       baseSkills,
    services:     baseServices,
    credentials:  baseCredentials,
    experience:   baseExperience,
    explorations: baseExplorations,
  } = sourceData

  const baseData = useRef({
    identity: baseIdentity,
    projects: baseProjects,
    skills: baseSkills,
    services: baseServices,
    credentials: baseCredentials,
    experience: baseExperience,
    explorations: baseExplorations,
  }).current
  const [data, setData] = useState(baseData)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [pendingWrites, setPendingWrites] = useState(0)
  const [persistenceError, setPersistenceError] = useState(null)
  const persistedData = useRef(baseData)
  const domainVersions = useRef({})
  const persistenceQueue = useRef(Promise.resolve())

  useEffect(() => {
    let active = true
    loadPortfolioData(baseData)
      .then(loadedData => {
        if (!active) return
        persistedData.current = loadedData
        setData(loadedData)
      })
      .catch(error => {
        if (active) setPersistenceError(`Chargement impossible : ${error.message}`)
      })
      .finally(() => {
        if (active) setIsDataLoading(false)
      })

    return () => { active = false }
  }, [baseData])

  /* Met à jour un domaine et le persiste dans le dépôt actif */
  const updateDomain = useCallback((domain, newValue) => {
    setData(prev => ({ ...prev, [domain]: newValue }))
    setPersistenceError(null)
    setPendingWrites(count => count + 1)

    const version = (domainVersions.current[domain] || 0) + 1
    domainVersions.current[domain] = version
    const operation = persistenceQueue.current.then(() => savePortfolioDomain(domain, newValue))
    persistenceQueue.current = operation
      .then(() => {
        persistedData.current = { ...persistedData.current, [domain]: newValue }
      })
      .catch(error => {
        setPersistenceError(`Sauvegarde impossible : ${error.message}`)
        if (domainVersions.current[domain] === version) {
          setData(prev => ({ ...prev, [domain]: persistedData.current[domain] }))
        }
      })
      .finally(() => setPendingWrites(count => Math.max(0, count - 1)))

    return operation.catch(() => false)
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
    const base = {
      identity:     baseIdentity,
      projects:     baseProjects,
      skills:       baseSkills,
      services:     baseServices,
      credentials:  baseCredentials,
      experience:   baseExperience,
      explorations: baseExplorations,
    }
    updateDomain(domain, base[domain])
  }, [baseIdentity, baseProjects, baseSkills, baseServices, baseCredentials, baseExperience, baseExplorations, updateDomain])

  /* Réinitialise TOUT aux données de base */
  const resetAll = useCallback(() => {
    const base = {
      identity:     baseIdentity,
      projects:     baseProjects,
      skills:       baseSkills,
      services:     baseServices,
      credentials:  baseCredentials,
      experience:   baseExperience,
      explorations: baseExplorations,
    }
    Object.entries(base).forEach(([domain, value]) => updateDomain(domain, value))
  }, [baseIdentity, baseProjects, baseSkills, baseServices, baseCredentials, baseExperience, baseExplorations, updateDomain])

  const migrateLocalOverrides = useCallback(async () => {
    setPersistenceError(null)
    setPendingWrites(count => count + 1)
    try {
      const importedRows = await migrateLocalData()
      const importedData = Object.fromEntries(importedRows.map(row => [row.domain, row.content]))
      if (importedRows.length > 0) {
        persistedData.current = { ...persistedData.current, ...importedData }
        setData(prev => ({ ...prev, ...importedData }))
      }
      return importedRows.map(row => row.domain)
    } catch (error) {
      setPersistenceError(`Import impossible : ${error.message}`)
      throw error
    } finally {
      setPendingWrites(count => Math.max(0, count - 1))
    }
  }, [])

  return {
    data,
    isDataLoading,
    isSaving: pendingWrites > 0,
    persistenceError,
    isSharedStorageEnabled: isSupabaseConfigured,
    updateIdentity,
    updateDomain,
    addItem,
    updateItem,
    removeItem,
    toggleVisibility,
    resetDomain,
    resetAll,
    migrateLocalOverrides,
  }
}
