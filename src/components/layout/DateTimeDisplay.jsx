/* ============================================================
   DateTimeDisplay — Affiche la date et l'heure en temps réel
   Props :
     compact (bool) — masque les secondes, réduit les re-renders
   ============================================================ */

import { useState, useEffect } from 'react'
import './DateTimeDisplay.css'

export function DateTimeDisplay({ compact = false }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    // En mode compact, on se contente d'une mise à jour à la minute
    const interval = compact ? 60_000 : 1_000
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, interval)

    return () => clearInterval(timer)
  }, [compact])

  const formattedDate = currentDateTime.toLocaleDateString('fr-FR', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  })
  const formattedTime = currentDateTime.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    ...(compact ? {} : { second: '2-digit' }),
  })

  return (
    <div className="datetime-display">
      <span className="datetime-display__date">{formattedDate}</span>
      <span className="datetime-display__time">{formattedTime}</span>
    </div>
  )
}
