/* ============================================================
   Layout — Enveloppe des pages publiques
   Fournit la Navbar, le Footer, et le décalage pour la navbar fixe.
   ============================================================ */

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'
import './Layout.css'

export function Layout({ theme, onToggleTheme }) {
  const location = useLocation()
  const navigate = useNavigate()

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
        {/* Clé par chemin → la transition de page est rejouée à chaque navigation */}
        <div key={location.pathname} className="page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
