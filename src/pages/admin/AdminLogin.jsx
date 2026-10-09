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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error, isConfigured, isLocalAdmin } = useAdmin()
  const inputRef = useRef(null)

  // Focus automatique
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (isLoading) return
    if (isLocalAdmin) {
      if (code) await login({ code })
      return
    }
    if (email.trim() && password) await login({ email, password })
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">

        {/* Signature — seul indice visible */}
        <div className="admin-login__brand" aria-hidden="true">
          <span className="admin-login__pheu">Pheu</span>
        </div>

        {!isConfigured && (
          <p className="admin-login__notice" role="status">
            Configure Supabase pour activer l’accès administrateur.
          </p>
        )}

        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          {isLocalAdmin ? (
            <div className="admin-login__field">
              <input
                ref={inputRef}
                type="password"
                className={`admin-login__input ${error ? 'admin-login__input--error' : ''}`}
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Code local"
                autoComplete="current-password"
                disabled={isLoading}
                aria-label="Code d’accès local"
                aria-describedby={error ? 'login-error' : undefined}
                required
              />
            </div>
          ) : (
            <>
              <div className="admin-login__field">
                <input
                  ref={inputRef}
                  type="email"
                  className={`admin-login__input ${error ? 'admin-login__input--error' : ''}`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Adresse e-mail"
                  autoComplete="username"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  disabled={!isConfigured || isLoading}
                  aria-label="Adresse e-mail"
                  aria-describedby={error ? 'login-error' : undefined}
                  required
                />
              </div>
              <div className="admin-login__field">
                <input
                  type="password"
                  className={`admin-login__input ${error ? 'admin-login__input--error' : ''}`}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  autoComplete="current-password"
                  disabled={!isConfigured || isLoading}
                  aria-label="Mot de passe"
                  aria-describedby={error ? 'login-error' : undefined}
                  required
                />
              </div>
            </>
          )}

          {error && (
            <p
              className="admin-login__error"
              id="login-error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login__btn"
            disabled={!isConfigured || (isLocalAdmin ? !code : !email.trim() || !password) || isLoading}
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
