/* ============================================================
   About — À propos : identité, parcours, compétences, preuves
   ============================================================ */

import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SkillTag } from '@/components/ui/SkillTag'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'
import './About.css'

/* Labels pour les types de credentials */
const CRED_TYPES = [
  { id: 'diplome',       label: 'Formations & Diplômes'                 },
  { id: 'certification', label: 'Certifications'                        },
  { id: 'badge',         label: 'Badges & Formations complémentaires'   },
  { id: 'formation',     label: 'Formations'                            },
]

export function About() {
  useReveal()
  useDocumentTitle('À propos', 'Qui est Phanuel DAVODOUN — parcours, compétences techniques, diplômes et expériences en développement web full stack.')
  const { identity, skillsByCategory, credentials, experience, meta } = useData()

  const { skillCategories, skillLevels } = meta

  /* Regroupe les credentials par type */
  const credsByType = CRED_TYPES.reduce((acc, type) => {
    const items = credentials.filter(c => c.type === type.id)
    if (items.length > 0) acc[type.id] = items
    return acc
  }, {})

  const hasCredentials  = credentials.length > 0
  const hasExperience   = experience.length > 0
  const hasSkills       = Object.keys(skillsByCategory).length > 0

  return (
    <div className="about-page">
      <div className="container">

        {/* ── En-tête ── */}
        <header className="about-header reveal">
          <h1 className="page-title">À propos</h1>
          <p className="page-subtitle">
            Qui je suis, comment je travaille et ce que j'ai construit.
          </p>
        </header>

        {/* ── Profil ── */}
        <section className="about-profile reveal">
          <div className="about-profile__main">
            <div className="about-profile__text">
              <h2 className="about-profile__name">
                {identity.fullName}
                <span className="about-profile__nickname" aria-hidden="true">
                  {identity.nickname}
                </span>
              </h2>
              <p className="about-profile__title">{identity.title}</p>

              <div className="about-profile__bio">
                {identity.longBio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Traits */}
            {identity.traits && identity.traits.length > 0 && (
              <div className="about-profile__traits">
                {identity.traits.map(trait => (
                  <div key={trait.label} className="about-trait">
                    <span className="about-trait__label">{trait.label}</span>
                    <span className="about-trait__sub">{trait.sublabel}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Philosophie */}
          {identity.philosophy && (
            <blockquote className="about-philosophy reveal">
              <p className="about-philosophy__text">« {identity.philosophy} »</p>
              <cite className="about-philosophy__author" aria-hidden="true">
                — {identity.nickname}
              </cite>
            </blockquote>
          )}
        </section>

        {/* ── Parcours / Expérience ── */}
        <SectionWrapper hasContent={hasExperience} className="about-section reveal">
          <h2 className="about-section__title">Mon parcours</h2>
          <div className="about-experience">
            {experience.map(exp => (
              <div key={exp.id} className="exp-item">
                <div className="exp-item__timeline">
                  <div className="exp-item__dot" />
                  <div className="exp-item__line" />
                </div>
                <div className="exp-item__content">
                  <div className="exp-item__header">
                    <div>
                      <h3 className="exp-item__title">{exp.title}</h3>
                      <p className="exp-item__org">{exp.organization}</p>
                    </div>
                    <span className="exp-item__period">{exp.period}</span>
                  </div>
                  {exp.description && (
                    <p className="exp-item__desc">{exp.description}</p>
                  )}
                  {exp.responsibilities?.length > 0 && (
                    <ul className="exp-item__list">
                      {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  )}
                  {exp.technologies?.length > 0 && (
                    <div className="exp-item__techs">
                      {exp.technologies.map(t => (
                        <span key={t} className="exp-item__tech">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ── Compétences ── */}
        <SectionWrapper hasContent={hasSkills} className="about-section" id="competences">
          <div className="reveal">
            <h2 className="about-section__title">Mes compétences</h2>
            <p className="about-section__subtitle">
              Des compétences solides et en constante évolution.
            </p>
          </div>

          {/* Légende des niveaux */}
          <div className="skills-legend reveal">
            {Object.entries(skillLevels)
              .sort((a, b) => a[1].order - b[1].order)
              .map(([key, val]) => (
                <span key={key} className={`skills-legend__item skill--${key}`}>
                  {val.label}
                </span>
              ))}
          </div>

          {/* Grille par catégorie */}
          <div className="skills-categories">
            {skillCategories.map(cat => {
              const items = skillsByCategory[cat.id]
              if (!items) return null
              return (
                <div key={cat.id} className="skills-category reveal">
                  <h3 className="skills-category__title">{cat.label}</h3>
                  <div className="skills-category__grid">
                    {items.map(skill => (
                      <SkillTag key={skill.id} skill={skill} showLevel />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </SectionWrapper>

        {/* ── Diplômes, Certifications, Badges ── */}
        <SectionWrapper hasContent={hasCredentials} className="about-section">
          <div className="reveal">
            <h2 className="about-section__title">Diplômes, certifications et badges</h2>
            <p className="about-section__subtitle">
              Voici ce que j'ai appris, et les éléments qui permettent de le vérifier.
            </p>
          </div>

          {CRED_TYPES.map(type => {
            const items = credsByType[type.id]
            if (!items) return null
            return (
              <div key={type.id} className="cred-group reveal">
                <h3 className="cred-group__title">{type.label}</h3>
                <div className="cred-list">
                  {items.map(cred => (
                    <div key={cred.id} className="cred-item">
                      <div className="cred-item__header">
                        <div>
                          <h4 className="cred-item__name">{cred.name}</h4>
                          <p className="cred-item__org">{cred.organization}</p>
                        </div>
                        <span className="cred-item__period">{cred.period}</span>
                      </div>
                      {cred.description && (
                        <p className="cred-item__desc">{cred.description}</p>
                      )}
                      {cred.verifyUrl && (
                        <a
                          href={cred.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cred-item__verify"
                        >
                          Vérifier →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </SectionWrapper>

        {/* ── CTA Contact ── */}
        <div className="about-cta reveal">
          <Button href="/contact" size="lg">Me contacter</Button>
          <Button href="/services" variant="secondary" size="lg">Voir mes services</Button>
        </div>

      </div>
    </div>
  )
}
