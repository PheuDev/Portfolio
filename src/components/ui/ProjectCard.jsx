/* ============================================================
   ProjectCard — Carte d'un projet
   Affichée dans la liste des projets et sur la page d'accueil.
   ============================================================ */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { Tag } from './Tag'
import './ProjectCard.css'

/* Le défilement automatique des captures est désactivé si l'utilisateur
   a demandé à réduire les animations (cohérent avec styles/animations.css) */
function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export function ProjectCard({ project, featured = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasMultipleImages = project.images && project.images.length > 1

  useEffect(() => {
    if (!hasMultipleImages || prefersReducedMotion()) return

    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex =>
        (prevIndex + 1) % project.images.length
      )
    }, 3000) // Change d'image toutes les 3 secondes

    return () => clearInterval(interval)
  }, [hasMultipleImages, project.images])

  return (
    <Link
      to={`/projets/${project.slug}`}
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
      aria-label={`Voir le projet ${project.name}`}
    >
      {/* Images du carrousel ou placeholder */}
      <div className="project-card__image-wrapper">
        {project.images && project.images.length > 0 ? (
          project.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Aperçu de ${project.name} - ${index + 1}`}
              loading="lazy"
              className={`project-card__image ${index === currentImageIndex ? 'project-card__image--active' : ''}`}
            />
          ))
        ) : (
          <div className="project-card__placeholder" aria-hidden="true">
            <span className="project-card__placeholder-letter">
              {project.name.charAt(0)}
            </span>
          </div>
        )}
        {/* Indicateurs de progression du carrousel */}
        {hasMultipleImages && (
          <div className="project-card__dots" aria-hidden="true">
            {project.images.map((_, index) => (
              <span
                key={index}
                className={`project-card__dot ${index === currentImageIndex ? 'project-card__dot--active' : ''}`}
              />
            ))}
          </div>
        )}
        <div className="project-card__overlay" aria-hidden="true" />
      </div>

      {/* Contenu */}
      <div className="project-card__content">
        <div className="project-card__header">
          <div className="project-card__title-group">
            <h3 className="project-card__name">{project.name}</h3>
            {project.subtitle && (
              <p className="project-card__subtitle">{project.subtitle}</p>
            )}
          </div>
          <Badge status={project.status} />
        </div>

        <p className="project-card__description">{project.shortDescription}</p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="project-card__techs">
            {project.technologies.slice(0, 4).map(tech => (
              <Tag key={tech} size="sm">{tech}</Tag>
            ))}
            {project.technologies.length > 4 && (
              <Tag size="sm" variant="muted">+{project.technologies.length - 4}</Tag>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
