/* ============================================================
   AdminRoute — Protection des routes d'administration
   Lit la session depuis AdminSessionContext (singleton).
   ============================================================ */

import { useAdmin } from '@/context/AdminSessionContext'
import { AdminLogin } from './AdminLogin'

export function AdminRoute({ children }) {
  const { isAuthenticated } = useAdmin()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return children
}
