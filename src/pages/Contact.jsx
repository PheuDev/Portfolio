/* ============================================================
   Contact — Informations de contact + disponibilité
   ============================================================ */

import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import './Contact.css'

export function Contact() {
  useReveal()
  useDocumentTitle('Contact', 'Contacter Phanuel DAVODOUN — disponible pour des missions freelance, emplois, stages et collaborations en développement web.')
  const { identity } = useData()

  const { availability } = identity
  const showAvailability = availability?.visible

  return (
    <div className="contact-page">
      <div className="container">

        {/* ── En-tête ── */}
        <header className="contact-header reveal">
          <h1 className="page-title">Contact</h1>
          <p className="page-subtitle">
            Une idée, un projet, une opportunité ?
          </p>
        </header>

        <div className="contact-layout">

          {/* ── Colonne principale ── */}
          <div className="contact-main">

            {/* Intro */}
            <div className="contact-intro reveal">
              <h2 className="contact-intro__title">Construisons quelque chose d'utile.</h2>
              <p className="contact-intro__text">
                Je suis disponible pour discuter de projets web, collaborations ou opportunités professionnelles.
                N'hésite pas à me contacter directement.
              </p>
            </div>

            {/* Email */}
            {identity.email && (
              <div className="contact-item reveal">
                <div className="contact-item__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-item__label">Email</p>
                  <a href={`mailto:${identity.email}`} className="contact-item__value">
                    {identity.email}
                  </a>
                </div>
              </div>
            )}

            {/* Localisation */}
            {identity.location && (
              <div className="contact-item reveal">
                <div className="contact-item__icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-item__label">Localisation</p>
                  <p className="contact-item__value contact-item__value--text">{identity.location}</p>
                </div>
              </div>
            )}

            {/* Liens réseaux */}
            {identity.links?.filter(l => l.url).length > 0 && (
              <div className="contact-links reveal">
                {identity.links.filter(l => l.url).map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social"
                  >
                    <span className="contact-social__label">{link.label}</span>
                    <span className="contact-social__arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Colonne latérale ── */}
          <div className="contact-sidebar">

            {/* Disponibilité */}
            {showAvailability && (
              <div className="contact-availability reveal">
                <div className="contact-availability__header">
                  <span className="contact-availability__dot" aria-hidden="true" />
                  <h3 className="contact-availability__status">{availability.status}</h3>
                </div>

                {availability.types?.some(t => t.active) && (
                  <div className="contact-availability__types">
                    {availability.types
                      .filter(t => t.active)
                      .map(t => (
                        <span key={t.label} className="contact-availability__type">
                          {t.label}
                        </span>
                      ))}
                  </div>
                )}

                {availability.note && (
                  <p className="contact-availability__note">{availability.note}</p>
                )}
              </div>
            )}

            {/* Projets sélectionnés */}
            <div className="contact-selected reveal">
              <p className="contact-selected__title">Mes projets</p>
              <div className="contact-selected__links">
                <Button href="/projets" variant="secondary" size="sm">
                  Voir mes projets
                </Button>
                <Button href="/services" variant="ghost" size="sm">
                  Voir mes services
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
