/* ============================================================
   AdminSessionContext — Partage la session admin dans toute l'app
   useAdminSession est instancié une seule fois ici pour éviter
   que chaque composant crée son propre état de session.
   ============================================================ */

import { createContext, useContext } from 'react'
import { useAdminSession } from '@/hooks/useAdminSession'

const AdminSessionContext = createContext(null)

export function AdminSessionProvider({ children }) {
  const session = useAdminSession()
  return (
    <AdminSessionContext.Provider value={session}>
      {children}
    </AdminSessionContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminSessionContext)
  if (!ctx) throw new Error('useAdmin must be used inside <AdminSessionProvider>')
  return ctx
}
