/* ============================================================
   AdminIdentity — Éditeur de l'identité et du profil
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'

export function AdminIdentity() {
  const { rawData, updateIdentity } = useData()
  const [form, setForm] = useState({ ...rawData.identity })
  const [saved, setSaved] = useState(false)

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function handleAvailabilityChange(field, value) {
    setForm(prev => ({
      ...prev,
      availability: { ...prev.availability, [field]: value },
    }))
    setSaved(false)
  }

  function toggleAvailabilityType(label) {
    const types = form.availability.types.map(t =>
      t.label === label ? { ...t, active: !t.active } : t
    )
    setForm(prev => ({ ...prev, availability: { ...prev.availability, types } }))
    setSaved(false)
  }

  function handleSave(e) {
    e.preventDefault()
    updateIdentity(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Identité</h1>
        <p className="admin-page-subtitle">Informations personnelles et présentation.</p>
      </div>

      <form className="admin-form" onSubmit={handleSave}>

        {/* Nom */}
        <div className="admin-card">
          <h2 className="admin-section-title">Nom et titre</h2>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Prénom</label>
              <input className="admin-form__input" value={form.firstName}
                onChange={e => handleChange('firstName', e.target.value)} />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Nom</label>
              <input className="admin-form__input" value={form.lastName}
                onChange={e => handleChange('lastName', e.target.value)} />
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Nom complet affiché</label>
            <input className="admin-form__input" value={form.fullName}
              onChange={e => handleChange('fullName', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Titre professionnel</label>
            <input className="admin-form__input" value={form.title}
              onChange={e => handleChange('title', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Accroche courte</label>
            <input className="admin-form__input" value={form.tagline}
              onChange={e => handleChange('tagline', e.target.value)} />
          </div>
        </div>

        {/* Bios */}
        <div className="admin-card">
          <h2 className="admin-section-title">Présentation</h2>
          <div className="admin-form__group">
            <label className="admin-form__label">Présentation courte</label>
            <span className="admin-form__sublabel">Utilisée dans le hero et les aperçus.</span>
            <textarea className="admin-form__textarea" rows={3} value={form.shortBio}
              onChange={e => handleChange('shortBio', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Présentation longue</label>
            <span className="admin-form__sublabel">Page À propos. Sépare les paragraphes par une ligne vide.</span>
            <textarea className="admin-form__textarea" rows={8} value={form.longBio}
              onChange={e => handleChange('longBio', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Philosophie</label>
            <span className="admin-form__sublabel">Citation affichée en italique sur la page À propos.</span>
            <textarea className="admin-form__textarea" rows={3} value={form.philosophy}
              onChange={e => handleChange('philosophy', e.target.value)} />
          </div>
        </div>

        {/* Contact */}
        <div className="admin-card">
          <h2 className="admin-section-title">Contact</h2>
          <div className="admin-form__group">
            <label className="admin-form__label">Email</label>
            <input className="admin-form__input" type="email" value={form.email}
              onChange={e => handleChange('email', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Localisation</label>
            <input className="admin-form__input" value={form.location}
              onChange={e => handleChange('location', e.target.value)} />
          </div>
        </div>

        {/* Disponibilité */}
        <div className="admin-card">
          <h2 className="admin-section-title">Disponibilité</h2>

          {/* Toggle visible */}
          <div className="admin-form__group">
            <button
              type="button"
              className={`admin-toggle ${form.availability?.visible ? 'admin-toggle--on' : ''}`}
              onClick={() => handleAvailabilityChange('visible', !form.availability?.visible)}
              aria-label="Afficher la section disponibilité"
            >
              <span className="admin-toggle__track">
                <span className="admin-toggle__thumb" />
              </span>
              <span className="admin-toggle__label">
                {form.availability?.visible ? 'Section visible' : 'Section masquée'}
              </span>
            </button>
          </div>

          {form.availability?.visible && (
            <>
              <div className="admin-form__group">
                <label className="admin-form__label">Statut</label>
                <input className="admin-form__input" value={form.availability?.status || ''}
                  onChange={e => handleAvailabilityChange('status', e.target.value)}
                  placeholder="ex. Disponible, En poste…" />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label">Types d'opportunités actifs</label>
                <div className="admin-checkbox-group">
                  {form.availability?.types?.map(t => (
                    <label key={t.label} className="admin-checkbox">
                      <input
                        type="checkbox"
                        checked={t.active}
                        onChange={() => toggleAvailabilityType(t.label)}
                      />
                      <span>{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label">Note de disponibilité</label>
                <textarea className="admin-form__textarea" rows={3}
                  value={form.availability?.note || ''}
                  onChange={e => handleAvailabilityChange('note', e.target.value)} />
              </div>
            </>
          )}
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="admin-action-btn admin-action-btn--primary">
            {saved ? '✓ Enregistré' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}
