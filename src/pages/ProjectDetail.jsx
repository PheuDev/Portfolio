/* ============================================================
   ProjectDetail — Page détaillée d'un projet
   Structure narrative : Problème → Contexte → Solution → Architecture
   Distingue clairement "disponible maintenant" vs "prévu"
   ============================================================ */

import { useParams, Link, Navigate } from 'react-router-dom'
import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { Badge } from '@/components/ui/Badge'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import './ProjectDetail.css'

/* Icône « lien externe » — signale clairement une sortie du site */
function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/* Affiche le domaine d'une URL de manière lisible */
function formatHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export function ProjectDetail() {
  useReveal()
  const { slug } = useParams()
  const { projects } = useData()

  const project = projects.find(p => p.slug === slug)

  // Titre dynamique selon le projet (hook toujours appelé, même si project est undefined)
  useDocumentTitle(
    project ? project.name : 'Projet',
    project ? project.shortDescription : undefined
  )

  // Projet introuvable → redirection
  if (!project) return <Navigate to="/projets" replace />

  const hasFeatures         = project.features?.length > 0
  const hasPlannedFeatures  = project.plannedFeatures?.length > 0
  const hasTechs            = project.technologies?.length > 0
  const hasChallenges       = project.challenges?.length > 0
  const hasLearnings        = project.learnings?.length > 0
  const hasImages           = project.images?.length > 0
  const hasWebsite          = Boolean(project.websiteUrl)
  const hasSecondaryLinks   = Boolean(project.demoUrl || project.githubUrl)

  return (
    <div className="project-detail">
      {/* Fond décoratif : captures floutées, purement esthétique, désactivé en portrait */}
      {hasImages && (
        <div className="project-detail__backdrop" aria-hidden="true">
          <img src={project.images[0]} alt="" />
        </div>
      )}

      <div className="container">

        {/* ── Retour ── */}
        <Link to="/projets" className="project-detail__back reveal">
          ← Retour aux projets
        </Link>

        {/* ── En-tête ── */}
        <header className="project-detail__header reveal">
          <div className="project-detail__title-row">
            <div>
              <h1 className="project-detail__name">{project.name}</h1>
              {project.subtitle && (
                <p className="project-detail__subtitle">{project.subtitle}</p>
              )}
            </div>
            <Badge status={project.status} size="lg" />
          </div>

          {project.period && (
            <p className="project-detail__period">{project.period}</p>
          )}

          <p className="project-detail__short-desc">{project.shortDescription}</p>

          {/* Site du projet — lien principal, mis en évidence */}
          {hasWebsite && (
            <a
              className="project-detail__site reveal"
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="project-detail__site-icon" aria-hidden="true">
                <ExternalLinkIcon />
              </span>
              <span className="project-detail__site-text">
                <span className="project-detail__site-label">Site du projet</span>
                <span className="project-detail__site-url">{formatHostname(project.websiteUrl)}</span>
              </span>
              <span className="project-detail__site-arrow" aria-hidden="true">→</span>
            </a>
          )}

          {/* Liens secondaires — démo et code source */}
          {hasSecondaryLinks && (
            <div className="project-detail__links">
              {project.demoUrl && (
                <Button
                  href={project.demoUrl}
                  external
                  size="md"
                  className="project-detail__cta"
                  icon={<ExternalLinkIcon />}
                  iconPosition="right"
                >
                  Voir la démo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  external
                  variant="secondary"
                  size="md"
                  className="project-detail__cta"
                  icon={<ExternalLinkIcon />}
                  iconPosition="right"
                >
                  Voir sur GitHub
                </Button>
              )}
            </div>
          )}
        </header>

        {/* ── Technologies ── */}
        {hasTechs && (
          <div className="project-detail__techs reveal">
            {project.technologies.map(tech => (
              <Tag key={tech} variant="accent">{tech}</Tag>
            ))}
          </div>
        )}

        {/* ── Captures du projet — défilement en zigzag ── */}
        {hasImages && (
          <section className="project-detail__gallery" aria-label={`Captures de ${project.name}`}>
            <h2 className="project-detail__gallery-title reveal">
              <span className="project-detail__section-label">Captures</span>
            </h2>
            <div className="project-detail__shots">
              {project.images.map((src, i) => (
                <figure
                  key={i}
                  className={`project-detail__shot reveal project-detail__shot--${i % 4}`}
                  data-reveal={i % 2 === 0 ? 'left' : 'right'}
                >
                  <img src={src} alt={`${project.name} — capture ${i + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── Corps narratif ── */}
        <div className="project-detail__body">

          {/* Problème */}
          {project.problem && (
            <div className="project-detail__section reveal" data-reveal="fade">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Problème</span>
              </h2>
              <p className="project-detail__text">{project.problem}</p>
            </div>
          )}

          {/* Contexte */}
          {project.context && (
            <div className="project-detail__section reveal" data-reveal="left">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Contexte</span>
              </h2>
              <p className="project-detail__text">{project.context}</p>
            </div>
          )}

          {/* Objectif */}
          {project.objective && (
            <div className="project-detail__section reveal" data-reveal="right">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Objectif</span>
              </h2>
              <p className="project-detail__text">{project.objective}</p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="project-detail__section reveal" data-reveal="scale">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Solution</span>
              </h2>
              <p className="project-detail__text">{project.solution}</p>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div className="project-detail__section reveal" data-reveal="left">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Architecture</span>
              </h2>
              <p className="project-detail__text">{project.architecture}</p>
            </div>
          )}

          {/* Fonctionnalités — séparation claire disponible vs prévu */}
          {(hasFeatures || hasPlannedFeatures) && (
            <div className="project-detail__section reveal" data-reveal="fade">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Fonctionnalités</span>
              </h2>

              {hasFeatures && (
                <div className="project-detail__features">
                  <p className="project-detail__features-label project-detail__features-label--available">
                    Ce qui est actuellement disponible
                  </p>
                  <ul className="project-detail__list">
                    {project.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {hasPlannedFeatures && (
                <div className="project-detail__features project-detail__features--planned">
                  <p className="project-detail__features-label project-detail__features-label--planned">
                    Ce qui est prévu ou envisagé
                  </p>
                  <ul className="project-detail__list project-detail__list--planned">
                    {project.plannedFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Difficultés */}
          {hasChallenges && (
            <div className="project-detail__section reveal" data-reveal="right">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Difficultés rencontrées</span>
              </h2>
              <ul className="project-detail__list">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Enseignements */}
          {hasLearnings && (
            <div className="project-detail__section reveal" data-reveal="left">
              <h2 className="project-detail__section-title">
                <span className="project-detail__section-label">Ce que j'en ai appris</span>
              </h2>
              <ul className="project-detail__list">
                {project.learnings.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* ── Pied de page projet ── */}
        <div className="project-detail__footer reveal">
          {hasSecondaryLinks && (
            <div className="project-detail__links">
              {project.demoUrl && (
                <Button
                  href={project.demoUrl}
                  external
                  size="lg"
                  className="project-detail__cta"
                  icon={<ExternalLinkIcon />}
                  iconPosition="right"
                >
                  Voir la démo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  external
                  variant="secondary"
                  size="lg"
                  className="project-detail__cta"
                  icon={<ExternalLinkIcon />}
                  iconPosition="right"
                >
                  Voir sur GitHub
                </Button>
              )}
            </div>
          )}
          <Link to="/projets" className="project-detail__back-link">
            ← Retour aux projets
          </Link>
        </div>

      </div>
    </div>
  )
}
