/* ============================================================
   App.jsx — Routeur principal du portfolio
   
   Routes publiques :  /  /projets  /projets/:slug  /a-propos
                       /services  /explorations  /contact
   Routes admin    :  /admin  /admin/identite  /admin/projets
                      /admin/competences  /admin/services
                      /admin/credentials  /admin/experience
                      /admin/explorations  /admin/opportunites
   ============================================================ */

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useData } from '@/context/DataContext'

// Contextes
import { DataProvider }           from '@/context/DataContext'
import { AdminSessionProvider }   from '@/context/AdminSessionContext'

// Thème
import { useTheme } from '@/hooks/useTheme'

// Layout public
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { About } from '@/pages/About'
import { Services } from '@/pages/Services'
import { Explorations } from '@/pages/Explorations'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

const lazyNamed = (loadModule, name) => lazy(() =>
  loadModule().then(module => ({ default: module[name] }))
)

const AdminRoute = lazyNamed(() => import('@/pages/admin/AdminRoute'), 'AdminRoute')
const AdminLayout = lazyNamed(() => import('@/pages/admin/AdminLayout'), 'AdminLayout')
const AdminDashboard = lazyNamed(() => import('@/pages/admin/AdminDashboard'), 'AdminDashboard')
const AdminIdentity = lazyNamed(() => import('@/pages/admin/editors/AdminIdentity'), 'AdminIdentity')
const AdminProjects = lazyNamed(() => import('@/pages/admin/editors/AdminProjects'), 'AdminProjects')
const AdminSkills = lazyNamed(() => import('@/pages/admin/editors/AdminSkills'), 'AdminSkills')
const AdminServices = lazyNamed(() => import('@/pages/admin/editors/AdminServices'), 'AdminServices')
const AdminCredentials = lazyNamed(() => import('@/pages/admin/editors/AdminCredentials'), 'AdminCredentials')
const AdminExperience = lazyNamed(() => import('@/pages/admin/editors/AdminExperience'), 'AdminExperience')
const AdminExplorations = lazyNamed(() => import('@/pages/admin/editors/AdminExplorations'), 'AdminExplorations')
const AdminOpportunites = lazyNamed(() => import('@/pages/admin/editors/AdminOpportunites'), 'AdminOpportunites')

function routeContent(element) {
  return (
    <Suspense fallback={<div className="route-loading" role="status">Chargement de la page…</div>}>
      {element}
    </Suspense>
  )
}

/* Composant racine qui porte le thème et les providers */
function AppContent() {
  const { theme, toggleTheme } = useTheme()
  const { isDataLoading } = useData()

  if (isDataLoading) {
    return (
      <div
        role="status"
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-muted)',
        }}
      >
        Chargement du portfolio…
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* ── Routes publiques ── */}
        <Route element={<Layout theme={theme} onToggleTheme={toggleTheme} />}>
          <Route index            element={<Home />} />
          <Route path="projets"   element={<Projects />} />
          <Route path="projets/:slug" element={<ProjectDetail />} />
          <Route path="a-propos"  element={<About />} />
          <Route path="services"  element={<Services />} />
          <Route path="explorations" element={<Explorations />} />
          <Route path="contact"   element={<Contact />} />
        </Route>

        {/* ── Routes admin (protégées) ── */}
        <Route
          path="admin"
          element={routeContent(
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          )}
        >
          <Route index                 element={routeContent(<AdminDashboard />)} />
          <Route path="identite"       element={routeContent(<AdminIdentity />)} />
          <Route path="projets"        element={routeContent(<AdminProjects />)} />
          <Route path="competences"    element={routeContent(<AdminSkills />)} />
          <Route path="services"       element={routeContent(<AdminServices />)} />
          <Route path="credentials"    element={routeContent(<AdminCredentials />)} />
          <Route path="experience"     element={routeContent(<AdminExperience />)} />
          <Route path="explorations"   element={routeContent(<AdminExplorations />)} />
          <Route path="opportunites"   element={routeContent(<AdminOpportunites />)} />
        </Route>

        {/* ── 404 — toute URL non reconnue ── */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

/* Provider racine */
export default function App() {
  return (
    <AdminSessionProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AdminSessionProvider>
  )
}
