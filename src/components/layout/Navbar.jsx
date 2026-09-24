/* ============================================================
   Navbar — Navigation principale
   
   Structure :
   [Nom officiel  Pheu*]   [Accueil Projets À propos Services Contact]   [ThemeSwitcher]
   
   * "Pheu" est la signature secondaire ET le point d'accès admin (easter egg discret).
     Deux clics rapprochés suffisent — aucune affordance visuelle volontaire
     (pas de cursor:pointer, pas de mention "Admin").
   ============================================================ */

import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ThemeSwitcher } from './ThemeSwitcher'
import { DateTimeDisplay } from './DateTimeDisplay'
import { useData } from '@/context/DataContext'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',            label: 'Accueil',     exact: true  },
  { to: '/projets',     label: 'Projets'                   },
  { to: '/a-propos',    label: 'À propos'                  },
  { to: '/services',    label: 'Services'                  },
  { to: '/explorations',label: 'Explorations'              },
  { to: '/contact',     label: 'Contact'                   },
]

export function Navbar({ theme, onToggleTheme, onAdminAccess }) {
  const { identity } = useData()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Compteur de clics sur "Pheu" : 2 clics rapprochés → accès admin
  // (gardé discret : un clic isolé ne déclenche rien)
  const pheuClicks = useRef(0)
  const pheuTimer = useRef(null)

  // Détecte le scroll pour le fond de la navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ferme le menu mobile au changement de route
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Ferme le menu mobile sur Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Le panneau mobile couvre l'écran : on gèle le défilement de la page
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [menuOpen])

  // Deux clics dans un court intervalle ouvrent l'accès admin
  // preventDefault/stopPropagation : le clic n'est pas une navigation
  function handlePheuClick(e) {
    e.preventDefault()
    e.stopPropagation()

    pheuClicks.current += 1
    clearTimeout(pheuTimer.current)

    if (pheuClicks.current >= 2) {
      pheuClicks.current = 0
      onAdminAccess?.()
    } else {
      pheuTimer.current = setTimeout(() => {
        pheuClicks.current = 0
      }, 500)
    }
  }

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
        <div className="navbar__inner container">

          {/* ── Logo / Identité ── */}
          <div className="navbar__brand">
            <Link to="/" className="navbar__brand-link" aria-label="Accueil">
              <span className="navbar__name">{identity.fullName}</span>
            </Link>
            {/* Signature "Pheu" — aussi point d'accès admin (easter egg discret) */}
            <span
              className="navbar__nickname"
              onClick={handlePheuClick}
              aria-hidden="true"   /* Invisible aux lecteurs d'écran — c'est une signature */
              tabIndex={-1}
            >
              {identity.nickname}
            </span>
          </div>

          {/* ── Groupe navigation et actions ── */}
          <div className="navbar__group">
            {/* ── Navigation desktop ── */}
            <nav className="navbar__nav" aria-label="Navigation principale">
              <ul className="navbar__links" role="list">
                {NAV_LINKS.map(({ to, label, exact }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={exact}
                      className={({ isActive }) =>
                        `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Actions ── */}
            <div className="navbar__actions">
              <DateTimeDisplay />
              <ThemeSwitcher theme={theme} onToggle={onToggleTheme} />

              {/* Bouton menu mobile */}
              <button
                className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Menu mobile ── */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
        // inert masque le contenu au clavier et aux lecteurs d'écran quand fermé
        // On utilise l'attribut DOM directement (pas encore de prop React native)
        ref={el => { if (el) el.inert = !menuOpen }}
      >
        <nav aria-label="Navigation mobile">
          <ul role="list">
            {NAV_LINKS.map(({ to, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Date et heure sur mobile — sans secondes (re-render réduit) */}
          <DateTimeDisplay compact />

          {/* Silhouette qui avance vers un but */}
          <div className="navbar__mobile-progress" aria-hidden="true">
            <span className="navbar__mobile-walker" />
            <span className="navbar__mobile-goal" />
          </div>
        </nav>
      </div>

      {/* Overlay menu mobile */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
