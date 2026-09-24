/* ============================================================
   useAdminSession — Gestion de la session administrateur
   - Vérifie si une session valide existe dans sessionStorage
   - Expose login / logout
   - Gère la protection anti-brute-force (tentatives + blocage)
   ============================================================ */

import { useState, useCallback } from 'react'
import {
  ACCESS_CODE_HASH,
  SESSION_DURATION_MS,
  SESSION_KEY,
  MAX_ATTEMPTS,
  LOCKOUT_DURATION_MS,
  ATTEMPTS_KEY,
} from '@/config/auth'

/* Hash SHA-256 via Web Crypto API (disponible nativement dans tous les navigateurs modernes) */
async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/* Lit l'état des tentatives depuis sessionStorage */
function getAttemptsState() {
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_KEY)
    if (!raw) return { count: 0, lockedUntil: null }
    return JSON.parse(raw)
  } catch {
    return { count: 0, lockedUntil: null }
  }
}

/* Sauvegarde l'état des tentatives */
function saveAttemptsState(state) {
  sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(state))
}

/* Vérifie si une session active existe et n'est pas expirée */
function checkExistingSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return false
    const session = JSON.parse(raw)
    if (!session.token || !session.createdAt) return false
    const age = Date.now() - session.createdAt
    return age < SESSION_DURATION_MS
  } catch {
    return false
  }
}

export function useAdminSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkExistingSession())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /* Retourne le nombre de secondes restantes de blocage, ou 0 si pas bloqué */
  function getLockoutRemaining() {
    const state = getAttemptsState()
    if (!state.lockedUntil) return 0
    const remaining = state.lockedUntil - Date.now()
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0
  }

  /* Tentative de connexion */
  const login = useCallback(async (code) => {
    setError(null)

    // Vérification du blocage
    const lockout = getLockoutRemaining()
    if (lockout > 0) {
      setError(`Trop de tentatives. Réessaie dans ${lockout} secondes.`)
      return false
    }

    setIsLoading(true)

    try {
      const inputHash = await sha256(code.trim())
      const isValid = inputHash === ACCESS_CODE_HASH

      if (isValid) {
        // Réinitialise les tentatives
        sessionStorage.removeItem(ATTEMPTS_KEY)

        // Crée la session avec un token aléatoire
        const session = {
          token: crypto.randomUUID(),
          createdAt: Date.now(),
        }
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
        setIsAuthenticated(true)
        setIsLoading(false)
        return true
      } else {
        // Incrémente les tentatives
        const state = getAttemptsState()
        const newCount = state.count + 1
        const newState = {
          count: newCount,
          lockedUntil: newCount >= MAX_ATTEMPTS ? Date.now() + LOCKOUT_DURATION_MS : null,
        }
        saveAttemptsState(newState)

        const remaining = MAX_ATTEMPTS - newCount
        if (newState.lockedUntil) {
          setError(`Trop de tentatives. Accès bloqué 5 minutes.`)
        } else {
          setError(
            remaining > 0
              ? `Code incorrect. ${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}.`
              : `Code incorrect.`
          )
        }
        setIsLoading(false)
        return false
      }
    } catch {
      setError('Une erreur est survenue. Réessaie.')
      setIsLoading(false)
      return false
    }
  }, [])

  /* Déconnexion */
  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
    setError(null)
  }, [])

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    getLockoutRemaining,
  }
}
