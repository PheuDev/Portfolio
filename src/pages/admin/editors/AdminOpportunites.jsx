/* ============================================================
   AdminOpportunites — Gestion de la section disponibilité
   Raccourci vers l'éditeur d'identité, section disponibilité.
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'

const OPPORTUNITY_TYPES = ['Emploi', 'Stage', 'Freelance', 'Collaboration', 'Projets']

export function AdminOpportunites() {
  const { rawData, updateIdentity } = useData()
  const availability = rawData.identity.availability || {
    visible: false, status: 'Disponible', types: [], note: '',
  }

  const [form, setForm] = useState({ ...availability })
  const [saved, setSaved] = useState(false)

  /* Initialise les types manquants */
  const allTypes = OPPORTUNITY_TYPES.map(label => ({
    label,
    active: form.types?.find(t => t.label === label)?.active ?? false,
  }))

  function handleChange(f, v) {
    setSaved(false)
    setForm(prev => ({ ...prev, [f]: v }))
  }

  function toggleType(label) {
    const types = allTypes.map(t =>
      t.label === label ? { ...t, active: !t.active } : t
    )
    setSaved(false)
    setForm(prev => ({ ...prev, types }))
  }

  function handleSave(e) {
    e.preventDefault()
    updateIdentity({ availability: { ...form, types: allTypes.map(t => ({ ...t, active: form.types?.find(x => x.label === t.label)?.active ?? t.active })) } })
    // Recalcule les types depuis l'état local
    const types = allTypes.map(t => ({
      label: t.label,
      active: form.types?.find(x => x.label === t.label)?.active ?? false,
    }))
    updateIdentity({ availability: { ...form, types } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Opportunités</h1>
        <p className="admin-page-subtitle">Gestion de ta disponibilité affichée sur le portfolio.</p>
      </div>

      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-card">
          <h2 className="admin-section-title">Visibilité</h2>
          <button
            type="button"
            className={`admin-toggle ${form.visible ? 'admin-toggle--on' : ''}`}
            onClick={() => handleChange('visible', !form.visible)}
          >
            <span className="admin-toggle__track">
              <span className="admin-toggle__thumb" />
            </span>
            <span className="admin-toggle__label">
              {form.visible
                ? 'Section disponibilité visible sur le portfolio'
                : 'Section disponibilité masquée'}
            </span>
          </button>
        </div>

        {form.visible && (
          <>
            <div className="admin-card">
              <h2 className="admin-section-title">Statut actuel</h2>
              <div className="admin-form__group">
                <label className="admin-form__label">Statut affiché</label>
                <input className="admin-form__input" value={form.status || ''}
                  onChange={e => handleChange('status', e.target.value)}
                  placeholder="ex. Disponible, En poste, En recherche active…" />
              </div>
            </div>

            <div className="admin-card">
              <h2 className="admin-section-title">Types d'opportunités</h2>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                Sélectionne les types d'opportunités qui te correspondent actuellement.
              </p>
              <div className="admin-checkbox-group">
                {allTypes.map(t => (
                  <label key={t.label} className="admin-checkbox">
                    <input
                      type="checkbox"
                      checked={form.types?.find(x => x.label === t.label)?.active ?? false}
                      onChange={() => toggleType(t.label)}
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <h2 className="admin-section-title">Message de disponibilité</h2>
              <div className="admin-form__group">
                <label className="admin-form__label">Note</label>
                <span className="admin-form__sublabel">
                  Texte affiché dans la section contact sous les types d'opportunités.
                </span>
                <textarea className="admin-form__textarea" rows={3}
                  value={form.note || ''}
                  onChange={e => handleChange('note', e.target.value)}
                  placeholder="ex. Ouvert aux opportunités intéressantes. N'hésite pas à me contacter." />
              </div>
            </div>
          </>
        )}

        <div className="admin-form__actions">
          <button type="submit" className="admin-action-btn admin-action-btn--primary">
            {saved ? '✓ Enregistré' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}
