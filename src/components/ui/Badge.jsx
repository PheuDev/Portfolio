/* ============================================================
   Badge — Statut d'un projet
   Affiche un badge coloré selon le statut.
   ============================================================ */

import './Badge.css'

const STATUS_CONFIG = {
  'realise':          { label: 'Réalisé',        className: 'badge--done'         },
  'en-cours':         { label: 'En cours',        className: 'badge--progress'     },
  'en-developpement': { label: 'En développement',className: 'badge--progress'     },
  'prototype':        { label: 'Prototype',       className: 'badge--prototype'    },
  'experimental':     { label: 'Expérimental',    className: 'badge--experimental' },
  'concept':          { label: 'Concept',         className: 'badge--concept'      },
  'a-venir':          { label: 'À venir',         className: 'badge--upcoming'     },
}

export function Badge({ status, size = 'md', className = '' }) {
  const config = STATUS_CONFIG[status] || { label: status, className: 'badge--concept' }

  return (
    <span className={`badge badge--${size} ${config.className} ${className}`}>
      <span className="badge__dot" aria-hidden="true" />
      {config.label}
    </span>
  )
}
