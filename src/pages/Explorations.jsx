/* ============================================================
   Explorations — Idées, concepts et projets futurs
   Clairement séparé des réalisations.
   ============================================================ */

import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import './Explorations.css'

const STATUS_CONFIG = {
  'idee':        { label: 'Idée',        color: 'var(--text-muted)'       },
  'exploration': { label: 'Exploration', color: 'var(--status-progress)'  },
  'concept':     { label: 'Concept',     color: 'var(--status-concept)'   },
  'a-venir':     { label: 'À venir',     color: 'var(--status-upcoming)'  },
}

export function Explorations() {
  useReveal()
  useDocumentTitle('Explorations', 'Idées, concepts et projets en cours d\'exploration par Phanuel DAVODOUN — curiosité technique et vision produit.')
  const { explorations } = useData()

  return (
    <div className="explorations-page">
      <div className="container">

        {/* ── En-tête ── */}
        <header className="explorations-header reveal">
          <h1 className="page-title">Explorations</h1>
          <p className="page-subtitle">
            Des idées, des concepts et des domaines que j'explore ou que j'envisage de développer.
            Ces éléments ne sont pas des projets terminés — ils reflètent ma curiosité et ma manière
            d'imaginer de nouvelles solutions.
          </p>
        </header>

        {/* ── Notice contexte ── */}
        <div className="explorations-notice reveal">
          <span className="explorations-notice__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </span>
          <p>
            Les explorations présentées ici sont des <strong>idées ou concepts en cours de réflexion</strong>.
            Elles ne sont pas des projets disponibles ou en développement actif.
          </p>
        </div>

        {/* ── Grille ── */}
        <SectionWrapper items={explorations} className="explorations-grid">
          {explorations.map((item, i) => {
            const statusConf = STATUS_CONFIG[item.status] || STATUS_CONFIG['idee']
            return (
              <div
                key={item.id}
                className="exploration-card reveal"
                style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}
              >
                <div className="exploration-card__header">
                  <div>
                    <h2 className="exploration-card__name">{item.name}</h2>
                    {item.subtitle && (
                      <p className="exploration-card__subtitle">{item.subtitle}</p>
                    )}
                  </div>
                  <span
                    className="exploration-card__status"
                    style={{ color: statusConf.color }}
                  >
                    {statusConf.label}
                  </span>
                </div>

                <p className="exploration-card__desc">{item.description}</p>

                <div className="exploration-card__footer">
                  {item.domain && (
                    <span className="exploration-card__domain">{item.domain}</span>
                  )}
                  {item.technologies?.length > 0 && (
                    <div className="exploration-card__techs">
                      {item.technologies.map(t => (
                        <span key={t} className="exploration-card__tech">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </SectionWrapper>

        {/* Message si vide — ne devrait jamais s'afficher grâce à SectionWrapper */}
      </div>
    </div>
  )
}
