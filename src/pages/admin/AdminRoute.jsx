/* ============================================================
   AdminRoute — Protection des routes d'administration
   Lit la session depuis AdminSessionContext (singleton).
   ============================================================ */

import { useAdmin } from '@/context/AdminSessionContext'
import { AdminLogin } from './AdminLogin'

export function AdminRoute({ children }) {
  const { isAuthenticated, isCheckingSession } = useAdmin()

  if (isCheckingSession) {
    return <div role="status" className="admin-auth-status">Vérification de la session…</div>
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return children
}
