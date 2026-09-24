/* ============================================================
   Projects — Liste de tous les projets avec filtres par statut
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import './Projects.css'

const FILTERS = [
  { id: 'all',            label: 'Tout'          },
  { id: 'realise',        label: 'Réalisé'       },
  { id: 'en-cours',       label: 'En cours'      },
  { id: 'concept',        label: 'Concept'       },
  { id: 'experimental',   label: 'Expérimental'  },
  { id: 'a-venir',        label: 'À venir'       },
]

// Regroupe plusieurs statuts sous un même filtre
function matchesFilter(project, filter) {
  if (filter === 'all') return true
  if (filter === 'realise')  return project.status === 'realise' || project.status === 'prototype'
  if (filter === 'en-cours') return project.status === 'en-cours' || project.status === 'en-developpement'
  return project.status === filter
}

export function Projects() {
  const { projects } = useData()
  const [activeFilter, setActiveFilter] = useState('all')

  useReveal([activeFilter])
  useDocumentTitle('Projets', 'Découvrez les projets web réalisés par Phanuel DAVODOUN — applications full stack, plateformes de gestion et outils métier.')

  const filtered = projects.filter(p => matchesFilter(p, activeFilter))

  // Ne montre que les filtres qui ont au moins un projet
  const availableFilters = FILTERS.filter(f => {
    if (f.id === 'all') return true
    return projects.some(p => matchesFilter(p, f.id))
  })

  return (
    <div className="projects-page">
      <div className="container">

        {/* ── En-tête ── */}
        <div className="page-header reveal">
          <h1 className="page-title">Mes projets</h1>
          <p className="page-subtitle">
            Des solutions concrètes, pensées pour être utiles, évolutives et maintenables.
          </p>
        </div>

        {/* ── Filtres ── */}
        {availableFilters.length > 1 && (
          <div className="projects-filters reveal" role="group" aria-label="Filtrer les projets par statut">
            {availableFilters.map(f => (
              <button
                key={f.id}
                className={`filter-btn ${activeFilter === f.id ? 'filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
                aria-pressed={activeFilter === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Grille ── */}
        <SectionWrapper items={filtered} className="projects-grid">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="reveal"
              style={{ '--reveal-delay': `${(i % 4) * 90}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </SectionWrapper>

        {/* Message si aucun résultat pour ce filtre */}
        {filtered.length === 0 && (
          <div className="projects-empty reveal">
            <p>Aucun projet dans cette catégorie pour l'instant.</p>
          </div>
        )}

      </div>
    </div>
  )
}
