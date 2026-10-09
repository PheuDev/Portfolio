/* ============================================================
   App.jsx — Routeur principal du portfolio
   
   Routes publiques :  /  /projets  /projets/:slug  /a-propos
                       /services  /explorations  /contact
   Routes admin    :  /admin  /admin/identite  /admin/projets
                      /admin/competences  /admin/services
                      /admin/credentials  /admin/experience
                      /admin/explorations  /admin/opportunites
   ============================================================ */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useData } from '@/context/DataContext'

// Contextes
import { DataProvider }           from '@/context/DataContext'
import { AdminSessionProvider }   from '@/context/AdminSessionContext'

// Thème
import { useTheme } from '@/hooks/useTheme'

// Layout public
import { Layout } from '@/components/layout/Layout'

// Pages publiques
import { Home }          from '@/pages/Home'
import { Projects }      from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { About }         from '@/pages/About'
import { Services }      from '@/pages/Services'
import { Explorations }  from '@/pages/Explorations'
import { Contact }       from '@/pages/Contact'

// Admin
import { AdminRoute }       from '@/pages/admin/AdminRoute'
import { AdminLayout }      from '@/pages/admin/AdminLayout'
import { AdminDashboard }   from '@/pages/admin/AdminDashboard'
import { AdminIdentity }    from '@/pages/admin/editors/AdminIdentity'
import { AdminProjects }    from '@/pages/admin/editors/AdminProjects'
import { AdminSkills }      from '@/pages/admin/editors/AdminSkills'
import { AdminServices }    from '@/pages/admin/editors/AdminServices'
import { AdminCredentials } from '@/pages/admin/editors/AdminCredentials'
import { AdminExperience }  from '@/pages/admin/editors/AdminExperience'
import { AdminExplorations} from '@/pages/admin/editors/AdminExplorations'
import { AdminOpportunites} from '@/pages/admin/editors/AdminOpportunites'

// 404
import { NotFound } from '@/pages/NotFound'

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
          <Route index            element={<Home />}          />
          <Route path="projets"   element={<Projects />}      />
          <Route path="projets/:slug" element={<ProjectDetail />} />
          <Route path="a-propos"  element={<About />}         />
          <Route path="services"  element={<Services />}      />
          <Route path="explorations" element={<Explorations />} />
          <Route path="contact"   element={<Contact />}       />
        </Route>

        {/* ── Routes admin (protégées) ── */}
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index                 element={<AdminDashboard />}   />
          <Route path="identite"       element={<AdminIdentity />}    />
          <Route path="projets"        element={<AdminProjects />}    />
          <Route path="competences"    element={<AdminSkills />}      />
          <Route path="services"       element={<AdminServices />}    />
          <Route path="credentials"    element={<AdminCredentials />} />
          <Route path="experience"     element={<AdminExperience />}  />
          <Route path="explorations"   element={<AdminExplorations />}/>
          <Route path="opportunites"   element={<AdminOpportunites />}/>
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
