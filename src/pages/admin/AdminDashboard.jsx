/* ============================================================
   AdminDashboard — Vue d'ensemble du contenu
   ============================================================ */

import { Link } from 'react-router-dom'
import { useData } from '@/context/DataContext'
import './AdminDashboard.css'

export function AdminDashboard() {
  const { rawData } = useData()

  const stats = [
    {
      label: 'Projets',
      to: '/admin/projets',
      total: rawData.projects.length,
      visible: rawData.projects.filter(p => p.visible).length,
    },
    {
      label: 'Compétences',
      to: '/admin/competences',
      total: rawData.skills.length,
      visible: rawData.skills.filter(s => s.visible).length,
    },
    {
      label: 'Services',
      to: '/admin/services',
      total: rawData.services.length,
      visible: rawData.services.filter(s => s.visible).length,
    },
    {
      label: 'Certifications',
      to: '/admin/credentials',
      total: rawData.credentials.length,
      visible: rawData.credentials.filter(c => c.visible).length,
    },
    {
      label: 'Expériences',
      to: '/admin/experience',
      total: rawData.experience.length,
      visible: rawData.experience.filter(e => e.visible).length,
    },
    {
      label: 'Explorations',
      to: '/admin/explorations',
      total: rawData.explorations.length,
      visible: rawData.explorations.filter(e => e.visible).length,
    },
  ]

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Vue d'ensemble</h1>
        <p className="admin-page-subtitle">État actuel du contenu de ton portfolio.</p>
      </div>

      {/* ── Stats ── */}
      <div className="dashboard-stats">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.to} className="dashboard-stat">
            <div className="dashboard-stat__numbers">
              <span className="dashboard-stat__visible">{stat.visible}</span>
              <span className="dashboard-stat__separator">/</span>
              <span className="dashboard-stat__total">{stat.total}</span>
            </div>
            <p className="dashboard-stat__label">{stat.label}</p>
            <p className="dashboard-stat__sub">
              {stat.visible} publié{stat.visible !== 1 ? 's' : ''}
              {stat.total - stat.visible > 0
                ? ` · ${stat.total - stat.visible} masqué${stat.total - stat.visible !== 1 ? 's' : ''}`
                : ''}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Actions rapides ── */}
      <div className="admin-card dashboard-actions">
        <h2 className="dashboard-actions__title">Actions rapides</h2>
        <div className="dashboard-actions__grid">
          <Link to="/admin/projets" className="dashboard-action">
            <span>+ Ajouter un projet</span>
          </Link>
          <Link to="/admin/competences" className="dashboard-action">
            <span>+ Ajouter une compétence</span>
          </Link>
          <Link to="/admin/credentials" className="dashboard-action">
            <span>+ Ajouter une certification</span>
          </Link>
          <Link to="/admin/explorations" className="dashboard-action">
            <span>+ Ajouter une exploration</span>
          </Link>
        </div>
      </div>

      {/* ── Liens ── */}
      <div className="dashboard-links">
        <Link to="/" className="dashboard-link" target="_blank" rel="noopener">
          Voir le portfolio public →
        </Link>
      </div>
    </div>
  )
}
