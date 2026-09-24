/* ============================================================
   Button — Bouton réutilisable
   Variantes : primary | secondary | ghost | danger

   Routage intelligent :
   - href interne (commence par /) → <Link> React Router (pas de rechargement)
   - href externe ou external=true  → <a> natif avec rel="noopener noreferrer"
   ============================================================ */

import { Link } from 'react-router-dom'
import './Button.css'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="btn__icon" aria-hidden="true">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="btn__icon" aria-hidden="true">{icon}</span>
      )}
    </>
  )

  if (href) {
    // Lien interne : React Router Link → pas de rechargement de page
    const isInternal = !external && href.startsWith('/')
    if (isInternal) {
      return (
        <Link
          to={href}
          className={classes}
          aria-disabled={disabled || undefined}
        >
          {content}
        </Link>
      )
    }
    // Lien externe : <a> natif
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  )
}
