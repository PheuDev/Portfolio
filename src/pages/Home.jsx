/* ============================================================
   Home — Page d'accueil
   Répond immédiatement : Qui / Que fais-je / Qu'ai-je construit / Comment travailler ensemble
   ============================================================ */

import { Link } from 'react-router-dom'
import { useData } from '@/context/DataContext'
import { useReveal } from '@/hooks/useReveal'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useTypewriter } from '@/hooks/useTypewriter'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SkillTag } from '@/components/ui/SkillTag'
import { Button } from '@/components/ui/Button'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import './Home.css'

/* Mots qui défilent sous le nom dans le hero —
   à ajuster selon ce que tu veux mettre en avant */
const HERO_WORDS = [
  'Développeur Web Full Stack',
  'Architecte d\'applications',
  'Créateur de solutions',
  'Passionné par le produit',
]

export function Home() {
  useReveal()
  useDocumentTitle('Accueil', 'Phanuel DAVODOUN — Développeur Web Full Stack. Conception et développement d\'applications web modernes, utiles et durables.')
  const { identity, featuredProjects, skills } = useData()

  // Texte dynamique du hero
  const { text: heroWord, isTyping, isDone } = useTypewriter({
    words: HERO_WORDS,
    typeSpeed: 70,
    deleteSpeed: 40,
    pauseAfter: 2200,
    pauseBefore: 350,
  })

  // Exactement 3 projets en home (les 3 premiers par order)
  const homeProjects = featuredProjects.slice(0, 3)

  // Compétences principales pour l'aperçu (maîtrise + bonne-pratique)
  const mainSkills = skills
    .filter(s => s.level === 'maitrise' || s.level === 'bonne-pratique')
    .slice(0, 8)

  return (
    <div className="home">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content">
            {/* Label dynamique avec effet machine à écrire */}
            <p className="hero__label animate-fade-in-up" aria-live="polite" aria-atomic="true">
              <span className="hero__typewriter">
                {heroWord}
              </span>
              <span
                className={`hero__cursor ${isDone ? 'hero__cursor--blink' : ''} ${isTyping ? 'hero__cursor--typing' : ''}`}
                aria-hidden="true"
              >|</span>
            </p>

            <h1 className="hero__title animate-fade-in-up animate-delay-1">
              Bonjour, je suis<br />
              <span className="hero__name">{identity.fullName}</span>
              <span className="hero__nickname" aria-label={`Aussi connu sous le nom de ${identity.nickname}`}>
                {identity.nickname}
              </span>
            </h1>

            <p className="hero__tagline animate-fade-in-up animate-delay-2">
              {identity.tagline}
            </p>

            <p className="hero__bio animate-fade-in-up animate-delay-3">
              {identity.shortBio}
            </p>

            <div className="hero__actions animate-fade-in-up animate-delay-4">
              <Button href="/projets" size="lg">
                Voir mes projets
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Me contacter
              </Button>
            </div>
          </div>

          {/* Traits professionnels */}
          {identity.traits && identity.traits.length > 0 && (
            <div className="hero__traits animate-fade-in animate-delay-3">
              {identity.traits.map(trait => (
                <div key={trait.label} className="hero__trait">
                  <span className="hero__trait-label">{trait.label}</span>
                  <span className="hero__trait-sub">{trait.sublabel}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PROJETS SÉLECTIONNÉS ─────────────────────────── */}
      <SectionWrapper items={homeProjects} className="section home-projects">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <h2 className="section-title">Mes projets récents</h2>
              <p className="section-subtitle">
                Des solutions concrètes, pensées pour être utiles, évolutives et maintenables.
              </p>
            </div>
            <Link to="/projets" className="section-header__link">
              Voir tous les projets →
            </Link>
          </div>

          <div className="home-projects__grid">
            {homeProjects.map((project, i) => (
              <div
                key={project.id}
                className="reveal"
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <ProjectCard project={project} featured />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── COMPÉTENCES PRINCIPALES ──────────────────────── */}
      <SectionWrapper items={mainSkills} className="section home-skills">
        <div className="container">
          <div className="section-header reveal">
            <h2 className="section-title">Mes principales compétences</h2>
            <Link to="/a-propos#competences" className="section-header__link">
              Voir toutes →
            </Link>
          </div>
          <div className="home-skills__grid reveal">
            {mainSkills.map(skill => (
              <SkillTag key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CALL TO ACTION ───────────────────────────────── */}
      <section className="section home-cta reveal">
        <div className="container">
          <div className="home-cta__inner">
            <div className="home-cta__bg" aria-hidden="true" />
            <h2 className="home-cta__title">
              Prêt à construire quelque chose d'utile ?
            </h2>
            <p className="home-cta__text">
              Que ce soit un projet, une collaboration ou une opportunité — je suis disponible pour en discuter.
            </p>
            <div className="home-cta__actions">
              <Button href="/contact" size="lg">
                Me contacter
              </Button>
              <Button href="/services" variant="ghost" size="lg">
                Voir mes services →
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
