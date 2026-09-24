/* ============================================================
   AdminCredentials — Gestion des diplômes, certifications, badges
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { AdminItemList } from '@/components/admin/shared/AdminItemList'
import '@/components/admin/shared/AdminItemList.css'

const TYPES = ['diplome', 'certification', 'badge', 'formation']
const TYPE_LABELS = {
  diplome: 'Diplôme', certification: 'Certification',
  badge: 'Badge', formation: 'Formation',
}

const EMPTY = {
  id: '', type: 'certification', name: '', organization: '',
  period: '', description: '', verifyUrl: '', documentUrl: '',
  visible: true, order: 99,
}

function generateId(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)
}

export function AdminCredentials() {
  const { rawData, addItem, updateItem, removeItem, toggleVisibility } = useData()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saved, setSaved] = useState(false)

  function openNew() { setForm({ ...EMPTY }); setEditing('new'); setSaved(false) }
  function openEdit(c) { setForm({ ...c }); setEditing(c); setSaved(false) }
  function close() { setEditing(null); setForm(EMPTY) }
  function handleChange(f, v) { setSaved(false); setForm(prev => ({ ...prev, [f]: v })) }

  function handleSave(e) {
    e.preventDefault()
    const id = form.id || generateId(form.name)
    const toSave = { ...form, id }
    if (editing === 'new') addItem('credentials', toSave)
    else updateItem('credentials', toSave.id, toSave)
    setSaved(true)
    setTimeout(() => { setSaved(false); close() }, 1000)
  }

  if (!editing) {
    return (
      <div>
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 className="admin-page-title">Diplômes & Certifications</h1>
            <p className="admin-page-subtitle">{rawData.credentials.length} élément(s).</p>
          </div>
          <button className="admin-action-btn admin-action-btn--primary" onClick={openNew}>+ Ajouter</button>
        </div>
        <AdminItemList
          items={rawData.credentials}
          onEdit={openEdit}
          onToggleVisibility={id => toggleVisibility('credentials', id)}
          onDelete={id => removeItem('credentials', id)}
          renderMeta={c => `${TYPE_LABELS[c.type] || c.type} · ${c.organization} · ${c.period}`}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="admin-page-header">
        <button className="admin-back-btn" onClick={close}>← Retour</button>
        <h1 className="admin-page-title">{editing === 'new' ? 'Nouveau' : `Modifier — ${form.name}`}</h1>
      </div>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-card">
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Type</label>
              <select className="admin-form__select" value={form.type}
                onChange={e => handleChange('type', e.target.value)}>
                {TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
              </select>
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Période / Date</label>
              <input className="admin-form__input" value={form.period}
                onChange={e => handleChange('period', e.target.value)}
                placeholder="ex. 2024" />
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Nom *</label>
            <input className="admin-form__input" required value={form.name}
              onChange={e => handleChange('name', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Organisme / Établissement</label>
            <input className="admin-form__input" value={form.organization}
              onChange={e => handleChange('organization', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Description courte</label>
            <textarea className="admin-form__textarea" rows={3} value={form.description}
              onChange={e => handleChange('description', e.target.value)} />
          </div>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Lien de vérification</label>
              <input className="admin-form__input" type="url" value={form.verifyUrl}
                onChange={e => handleChange('verifyUrl', e.target.value)}
                placeholder="https://…" />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Document public</label>
              <input className="admin-form__input" type="url" value={form.documentUrl}
                onChange={e => handleChange('documentUrl', e.target.value)}
                placeholder="https://…" />
            </div>
          </div>
          <div className="admin-form__grid-2">
            <label className="admin-checkbox">
              <input type="checkbox" checked={form.visible}
                onChange={e => handleChange('visible', e.target.checked)} />
              <span>Visible publiquement</span>
            </label>
            <div className="admin-form__group">
              <label className="admin-form__label">Ordre</label>
              <input className="admin-form__input" type="number" value={form.order}
                onChange={e => handleChange('order', parseInt(e.target.value) || 99)}
                style={{ maxWidth: '120px' }} />
            </div>
          </div>
        </div>
        <div className="admin-form__actions">
          <button type="submit" className="admin-action-btn admin-action-btn--primary">
            {saved ? '✓ Enregistré' : (editing === 'new' ? 'Créer' : 'Enregistrer')}
          </button>
          <button type="button" className="admin-action-btn" onClick={close}>Annuler</button>
        </div>
      </form>
    </div>
  )
}
