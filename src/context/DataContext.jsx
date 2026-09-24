/* ============================================================
   DataContext — Fournit les données du portfolio à toute l'app
   
   Utilisation dans un composant :
     const { data, updateItem, addItem, ... } = useData()
   
   Les données publiques (projets visibles, compétences visibles…)
   sont calculées ici pour éviter de dupliquer le filtrage partout.
   ============================================================ */

import { createContext, useContext, useMemo } from 'react'
import { usePortfolioData } from '@/hooks/usePortfolioData'

// Imports des données de base
import { identity }     from '@/data/identity'
import { projects }     from '@/data/projects'
import { skills, skillCategories, skillLevels } from '@/data/skills'
import { services }     from '@/data/services'
import { credentials }  from '@/data/credentials'
import { experiences }  from '@/data/experience'
import { explorations } from '@/data/explorations'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const portfolioData = usePortfolioData({
    identity,
    projects,
    skills,
    services,
    credentials,
    experience: experiences,
    explorations,
  })

  const { data } = portfolioData

  /* ── Données publiques filtrées (visible: true uniquement) ── */
  const publicData = useMemo(() => {
    const visibleProjects     = data.projects.filter(p => p.visible)
    const visibleSkills       = data.skills.filter(s => s.visible)
    const visibleServices     = data.services.filter(s => s.visible)
    const visibleCredentials  = data.credentials.filter(c => c.visible)
    const visibleExperience   = data.experience.filter(e => e.visible)
    const visibleExplorations = data.explorations.filter(e => e.visible)

    // Projets par catégorie de statut
    const completedProjects    = visibleProjects.filter(p => p.status === 'realise' || p.status === 'prototype')
    const inProgressProjects   = visibleProjects.filter(p => p.status === 'en-cours' || p.status === 'en-developpement')
    const conceptProjects      = visibleProjects.filter(p => p.status === 'concept' || p.status === 'a-venir' || p.status === 'experimental')
    const featuredProjects     = visibleProjects.filter(p => p.featured).sort((a, b) => a.order - b.order)

    // Compétences par catégorie, triées par ordre
    const skillsByCategory = skillCategories.reduce((acc, cat) => {
      const items = visibleSkills
        .filter(s => s.category === cat.id)
        .sort((a, b) => a.order - b.order)
      if (items.length > 0) acc[cat.id] = items
      return acc
    }, {})

    return {
      identity:         data.identity,
      projects:         visibleProjects,
      featuredProjects,
      completedProjects,
      inProgressProjects,
      conceptProjects,
      skills:           visibleSkills,
      skillsByCategory,
      services:         visibleServices.sort((a, b) => a.order - b.order),
      credentials:      visibleCredentials.sort((a, b) => a.order - b.order),
      experience:       visibleExperience.sort((a, b) => a.order - b.order),
      explorations:     visibleExplorations.sort((a, b) => a.order - b.order),
    }
  }, [data])

  /* ── Constantes de référence ───────────────────────────── */
  const meta = { skillCategories, skillLevels }

  const value = {
    // Données publiques (filtrées)
    ...publicData,
    // Données brutes (pour l'admin)
    rawData: data,
    // Méthodes de mutation (admin)
    ...portfolioData,
    // Méta-données
    meta,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

/* Hook de consommation */
export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside <DataProvider>')
  return ctx
}
