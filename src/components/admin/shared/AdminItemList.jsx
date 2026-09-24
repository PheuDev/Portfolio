/* ============================================================
   AdminItemList — Liste d'éléments administrables générique
   Affiche nom, méta, visibilité, actions (modifier/masquer/supprimer)
   ============================================================ */

import { useState } from 'react'

export function AdminItemList({ items, onEdit, onToggleVisibility, onDelete, renderMeta }) {
  const [confirmDelete, setConfirmDelete] = useState(null)

  function handleDelete(id) {
    if (confirmDelete === id) {
      onDelete(id)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
      // Auto-annule après 3s
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  if (items.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
        Aucun élément pour l'instant.
      </p>
    )
  }

  return (
    <div>
      {items.map(item => (
        <div key={item.id} className={`admin-item ${!item.visible ? 'admin-item--hidden' : ''}`}>
          <div className="admin-item__info">
            <p className="admin-item__name">{item.name || item.title || item.fullName || item.id}</p>
            {renderMeta && (
              <p className="admin-item__meta">{renderMeta(item)}</p>
            )}
          </div>

          <div className="admin-item__right">
            {/* Indicateur visibilité */}
            <span className={`admin-visibility ${item.visible ? 'admin-visibility--visible' : ''}`}>
              <span className="admin-visibility__dot" />
              {item.visible ? 'Visible' : 'Masqué'}
            </span>

            {/* Actions */}
            <div className="admin-item__actions">
              <button
                className="admin-action-btn"
                onClick={() => onEdit(item)}
                title="Modifier"
              >
                Modifier
              </button>
              <button
                className="admin-action-btn"
                onClick={() => onToggleVisibility(item.id)}
                title={item.visible ? 'Masquer' : 'Rendre visible'}
              >
                {item.visible ? 'Masquer' : 'Afficher'}
              </button>
              <button
                className={`admin-action-btn ${confirmDelete === item.id ? 'admin-action-btn--danger' : ''}`}
                onClick={() => handleDelete(item.id)}
                title="Supprimer"
              >
                {confirmDelete === item.id ? 'Confirmer ?' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
