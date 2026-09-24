/* ============================================================
   Tag — Étiquette de technologie ou de catégorie
   ============================================================ */

import './Tag.css'

export function Tag({ children, variant = 'default', size = 'md', className = '' }) {
  return (
    <span className={`tag tag--${variant} tag--${size} ${className}`}>
      {children}
    </span>
  )
}
