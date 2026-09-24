/* ============================================================
   AdminLogin — Écran d'accès à l'administration
   Discret — seule la signature "Pheu" est affichée.
   Pas de mention de "Admin", "Dashboard" ou "Connexion admin".
   ============================================================ */

import { useState, useRef, useEffect } from 'react'
import { useAdmin } from '@/context/AdminSessionContext'
import './AdminLogin.css'

export function AdminLogin() {
  const [code, setCode] = useState('')
  const [lockoutSeconds, setLockoutSeconds] = useState(0)
  const { login, isLoading, error, getLockoutRemaining } = useAdmin()
  const inputRef = useRef(null)

  // Focus automatique
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Décompte du blocage
  useEffect(() => {
    const remaining = getLockoutRemaining()
    if (remaining > 0) {
      setLockoutSeconds(remaining)
      const timer = setInterval(() => {
        const r = getLockoutRemaining()
        setLockoutSeconds(r)
        if (r <= 0) {
          setLockoutSeconds(0)
          clearInterval(timer)
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [error, getLockoutRemaining])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!code.trim() || isLoading || lockoutSeconds > 0) return
    await login(code)
    // Si succès, AdminRoute re-rend automatiquement les children
    // (isAuthenticated devient true dans le context partagé)
  }

  const isLocked = lockoutSeconds > 0

  return (
    <div className="admin-login">
      <div className="admin-login__card">

        {/* Signature — seul indice visible */}
        <div className="admin-login__brand" aria-hidden="true">
          <span className="admin-login__pheu">Pheu</span>
        </div>

        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          <div className="admin-login__field">
            <input
              ref={inputRef}
              type="password"
              className={`admin-login__input ${error ? 'admin-login__input--error' : ''}`}
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Code d'accès"
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              disabled={isLocked || isLoading}
              aria-label="Code d'accès"
              aria-describedby={error ? 'login-error' : undefined}
            />
          </div>

          {(error || isLocked) && (
            <p
              className="admin-login__error"
              id="login-error"
              role="alert"
              aria-live="polite"
            >
              {isLocked ? `Accès temporairement suspendu — ${lockoutSeconds}s` : error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login__btn"
            disabled={!code.trim() || isLocked || isLoading}
          >
            {isLoading ? 'Vérification…' : 'Accéder'}
          </button>
        </form>

        <button
          className="admin-login__cancel"
          onClick={() => window.history.back()}
          type="button"
        >
          ← Retour
        </button>
      </div>
    </div>
  )
}
