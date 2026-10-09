/* ============================================================
   AdminLayout — Interface d'administration
   Sidebar de navigation + zone de contenu principale.
   ============================================================ */

import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAdmin } from '@/context/AdminSessionContext'
import { useData } from '@/context/DataContext'
import './AdminLayout.css'

/* Sections de l'administration */
const ADMIN_NAV = [
  {
    group: 'Contenu',
    items: [
      { to: '/admin',             label: 'Vue d\'ensemble',  icon: '⊞', end: true },
      { to: '/admin/identite',    label: 'Identité',         icon: '◉'            },
      { to: '/admin/projets',     label: 'Projets',          icon: '▦'            },
      { to: '/admin/competences', label: 'Compétences',      icon: '◈'            },
      { to: '/admin/services',    label: 'Services',         icon: '◇'            },
    ],
  },
  {
    group: 'Profil',
    items: [
      { to: '/admin/credentials',  label: 'Diplômes & Certif.', icon: '◎' },
      { to: '/admin/experience',   label: 'Expérience',          icon: '◑' },
      { to: '/admin/explorations', label: 'Explorations',        icon: '◬' },
      { to: '/admin/opportunites', label: 'Opportunités',        icon: '◐' },
    ],
  },
]

export function AdminLayout() {
  const { logout } = useAdmin()
  const { identity, isSaving, isSharedStorageEnabled, persistenceError } = useData()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-layout">

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__brand">
            <span className="admin-sidebar__pheu">Pheu</span>
            <span className="admin-sidebar__sublabel">Gestion du contenu</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Navigation administration">
          {ADMIN_NAV.map(group => (
            <div key={group.group} className="admin-nav-group">
              <p className="admin-nav-group__label">{group.group}</p>
              <ul role="list">
                {group.items.map(item => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `admin-nav-link ${isActive ? 'admin-nav-link--active' : ''}`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="admin-nav-link__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__public-link">
            ← Voir le portfolio
          </Link>
          <button className="admin-sidebar__logout" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Zone principale ── */}
      <div className="admin-main">
        {/* Topbar mobile */}
        <header className="admin-topbar">
          <button
            className="admin-topbar__burger"
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Ouvrir la navigation"
          >
            <span /><span /><span />
          </button>
          <span className="admin-topbar__brand">
            <span className="admin-topbar__pheu">Pheu</span>
          </span>
          <button className="admin-topbar__logout" onClick={logout}>
            Déconnexion
          </button>
        </header>

        <div className="admin-content">
          {persistenceError ? (
            <p className="admin-persistence-status admin-persistence-status--error" role="alert">
              {persistenceError}
            </p>
          ) : isSaving ? (
            <p className="admin-persistence-status" role="status">Synchronisation des modifications…</p>
          ) : !isSharedStorageEnabled ? (
            <p className="admin-persistence-status" role="status">
              Stockage local : les modifications restent sur cet appareil.
            </p>
          ) : null}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
