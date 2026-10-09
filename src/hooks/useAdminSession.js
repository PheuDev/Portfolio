/* ============================================================
  useAdminSession — Gestion de la session administrateur
  - Vérifie la session Supabase et le rôle admin
  - Autorise un code local uniquement en développement
   ============================================================ */

import { useState, useCallback, useEffect } from 'react'
import { hasPartialSupabaseConfig, isSupabaseConfigured, supabase } from '@/lib/supabase'

const LOCAL_ADMIN_SESSION_KEY = 'pheu_local_admin_session'
const localAdminCode = !isSupabaseConfigured && import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_ADMIN_CODE?.trim()
  : ''
const isLocalAdminEnabled = Boolean(localAdminCode)

function isAdminSession(session) {
  return session?.user?.app_metadata?.role === 'admin'
}

function hasLocalAdminSession() {
  try {
    return sessionStorage.getItem(LOCAL_ADMIN_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function useAdminSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    isLocalAdminEnabled && hasLocalAdminSession()
  )
  const [isCheckingSession, setIsCheckingSession] = useState(isSupabaseConfigured)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) return undefined

    let active = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(isAdminSession(session))
      setIsCheckingSession(false)
    })

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return
      setIsAuthenticated(isAdminSession(data.session))
      if (sessionError) setError('Impossible de vérifier la session. Réessaie.')
      setIsCheckingSession(false)
    }).catch(() => {
      if (!active) return
      setError('Impossible de vérifier la session. Réessaie.')
      setIsCheckingSession(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback(async ({ email, password, code }) => {
    setError(null)

    if (isLocalAdminEnabled) {
      if (code !== localAdminCode) {
        setError('Code local incorrect.')
        return false
      }
      try {
        sessionStorage.setItem(LOCAL_ADMIN_SESSION_KEY, 'true')
        setIsAuthenticated(true)
        return true
      } catch {
        setError('Impossible de créer la session locale dans ce navigateur.')
        return false
      }
    }

    if (!supabase) {
      setError(hasPartialSupabaseConfig
        ? 'Configuration Supabase incomplète. Vérifie les variables d’environnement.'
        : 'Connexion admin indisponible : configure Supabase pour activer cet accès.')
      return false
    }

    setIsLoading(true)
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) {
        setError(authError.message === 'Invalid login credentials'
          ? 'Adresse e-mail ou mot de passe incorrect.'
          : 'Connexion impossible. Vérifie tes identifiants et réessaie.')
        return false
      }

      if (!isAdminSession(data.session)) {
        await supabase.auth.signOut()
        setError('Ce compte n’a pas les droits administrateur.')
        return false
      }

      setIsAuthenticated(true)
      return true
    } catch (authError) {
      setError('Connexion impossible. Vérifie ta connexion internet et réessaie.')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setError(null)
    if (isLocalAdminEnabled) {
      try {
        sessionStorage.removeItem(LOCAL_ADMIN_SESSION_KEY)
      } catch {
        setError('Impossible de supprimer la session locale dans ce navigateur.')
      }
    }
    return supabase?.auth.signOut()
  }, [])

  return {
    isAuthenticated,
    isCheckingSession,
    isLoading,
    error,
    login,
    logout,
    isConfigured: isSupabaseConfigured || isLocalAdminEnabled,
    isLocalAdmin: isLocalAdminEnabled,
  }
}
