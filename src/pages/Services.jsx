/* ============================================================
   Services — Ce que je peux proposer professionnellement
   ============================================================ */

import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import './Services.css'

/* Icônes SVG inline pour chaque type de service */
const SERVICE_ICONS = {
  web: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  frontend: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  backend: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  design: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41"/><path d="M4.93 4.93l1.41 1.41"/><path d="M4.93 19.07l1.41-1.41"/><path d="M19.07 19.07l-1.41-1.41"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  maintenance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  consult: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
}

export function Services() {
  useReveal()
  useDocumentTitle('Services', 'Services proposés par Phanuel DAVODOUN — développement frontend, backend, conception de systèmes, maintenance et conseil.')
  const { services, identity } = useData()

  return (
    <div className="services-page">
      <div className="container">

        {/* ── En-tête ── */}
        <header className="services-header reveal">
          <h1 className="page-title">Mes services</h1>
          <p className="page-subtitle">
            Des compétences concrètes au service de vos projets.
          </p>
        </header>

        {/* ── Grille de services ── */}
        <SectionWrapper items={services} className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="service-card reveal"
              style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}
            >
              <div className="service-card__icon" aria-hidden="true">
                {SERVICE_ICONS[service.icon] || SERVICE_ICONS.web}
              </div>
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
                {service.benefit && (
                  <p className="service-card__benefit">
                    <span className="service-card__benefit-label">Bénéfice — </span>
                    {service.benefit}
                  </p>
                )}
                {service.technologies?.length > 0 && (
                  <div className="service-card__techs">
                    {service.technologies.map(t => (
                      <Tag key={t} size="sm">{t}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </SectionWrapper>

        {/* ── CTA ── */}
        <div className="services-cta reveal">
          <div className="services-cta__inner">
            <div className="services-cta__bg" aria-hidden="true" />
            <h2 className="services-cta__title">Vous avez un projet ?</h2>
            <p className="services-cta__text">
              Discutons ensemble de vos besoins et trouvons ensemble la meilleure solution.
            </p>
            <Button href="/contact" size="lg">Me contacter</Button>
          </div>
        </div>

      </div>
    </div>
  )
}
