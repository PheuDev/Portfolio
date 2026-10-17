/* ============================================================
   Layout — Enveloppe des pages publiques
   Fournit la Navbar, le Footer, et le décalage pour la navbar fixe.
   ============================================================ */

import { useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'
import './Layout.css'

export function Layout({ theme, onToggleTheme }) {
  const location = useLocation()
  const navigate = useNavigate()
  const outlet = useOutlet()
  const latestRoute = useRef({ path: location.pathname, outlet })
  const previousPath = useRef(location.pathname)
  const [visibleRoute, setVisibleRoute] = useState(() => ({
    path: location.pathname,
    outlet,
    phase: 'entering',
  }))

  latestRoute.current = { path: location.pathname, outlet }

  useLayoutEffect(() => {
    if (previousPath.current === location.pathname) return undefined
    previousPath.current = location.pathname

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVisibleRoute({ ...latestRoute.current, phase: 'entered' })
      return undefined
    }

    setVisibleRoute(current => ({ ...current, phase: 'exiting' }))
    const exitTimer = window.setTimeout(() => {
      const nextRoute = latestRoute.current
      setVisibleRoute({ ...nextRoute, phase: 'entering' })
      window.requestAnimationFrame(() => {
        setVisibleRoute(current => current.path === nextRoute.path && current.phase === 'entering'
          ? { ...current, phase: 'entered' }
          : current
        )
      })
    }, 180)

    return () => window.clearTimeout(exitTimer)
  }, [location.pathname])

  const pageRef = useRef(null)
  useLayoutEffect(() => {
    if (pageRef.current) pageRef.current.inert = visibleRoute.phase === 'exiting'
  }, [visibleRoute.phase])

  function handleAdminAccess() {
    navigate('/admin')
  }

  return (
    <div className="layout">
      {/* Lien d'évitement — accessible au clavier, invisible à l'écran */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onAdminAccess={handleAdminAccess}
      />
      <main className="layout__main" id="main-content">
        <div
          key={visibleRoute.path}
          ref={pageRef}
          className={`page-transition page-transition--${visibleRoute.phase}`}
          aria-hidden={visibleRoute.phase === 'exiting'}
        >
          {visibleRoute.outlet}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
