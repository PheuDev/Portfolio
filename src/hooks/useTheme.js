/* ============================================================
   useTheme — Gestion du thème clair / sombre
   - Lit la préférence stockée dans localStorage
   - Applique data-theme sur <html>
   - Respecte prefers-color-scheme si aucune préférence stockée
   ============================================================ */

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pheu_theme'

function getInitialTheme() {
  // 1. Préférence explicitement enregistrée
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored

  // 2. Préférence système
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'

  // 3. Défaut : sombre
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(() => getInitialTheme())

  // Applique le thème sur <html> à chaque changement
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light')
    } else {
      root.removeAttribute('data-theme')
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
