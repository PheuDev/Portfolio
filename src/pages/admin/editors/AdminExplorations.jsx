/* ============================================================
   AdminExplorations — Gestion des explorations / concepts
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { AdminItemList } from '@/components/admin/shared/AdminItemList'
import '@/components/admin/shared/AdminItemList.css'

const STATUSES = ['idee', 'exploration', 'concept', 'a-venir']
const STATUS_LABELS = { idee: 'Idée', exploration: 'Exploration', concept: 'Concept', 'a-venir': 'À venir' }

const EMPTY = {
  id: '', name: '', subtitle: '', description: '',
  status: 'idee', domain: '', technologies: [],
  visible: true, order: 99,
}

function generateId(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)
}

function ArrayEditor({ value = [], onChange, placeholder = 'Ajouter…' }) {
  const [input, setInput] = useState('')
  function add() {
    if (!input.trim()) return
    onChange([...value, input.trim()])
    setInput('')
  }
  return (
    <div className="array-editor">
      <div className="array-editor__items">
        {value.map((item, i) => (
          <span key={i} className="array-editor__tag">
            {item}
            <button type="button" onClick={() => onChange(value.filter((_, idx) => idx !== i))}>×</button>
          </span>
        ))}
      </div>
      <div className="array-editor__input">
        <input className="admin-form__input" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder} />
        <button type="button" className="admin-action-btn admin-action-btn--primary" onClick={add}>+</button>
      </div>
    </div>
  )
}

export function AdminExplorations() {
  const { rawData, addItem, updateItem, removeItem, toggleVisibility } = useData()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saved, setSaved] = useState(false)

  function openNew() { setForm({ ...EMPTY }); setEditing('new'); setSaved(false) }
  function openEdit(e) { setForm({ ...e }); setEditing(e); setSaved(false) }
  function close() { setEditing(null); setForm(EMPTY) }
  function handleChange(f, v) { setSaved(false); setForm(prev => ({ ...prev, [f]: v })) }

  function handleSave(e) {
    e.preventDefault()
    const id = form.id || generateId(form.name)
    const toSave = { ...form, id }
    if (editing === 'new') addItem('explorations', toSave)
    else updateItem('explorations', toSave.id, toSave)
    setSaved(true)
    setTimeout(() => { setSaved(false); close() }, 1000)
  }

  if (!editing) {
    return (
      <div>
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 className="admin-page-title">Explorations</h1>
            <p className="admin-page-subtitle">{rawData.explorations.length} exploration(s).</p>
          </div>
          <button className="admin-action-btn admin-action-btn--primary" onClick={openNew}>+ Ajouter</button>
        </div>
        <AdminItemList
          items={rawData.explorations}
          onEdit={openEdit}
          onToggleVisibility={id => toggleVisibility('explorations', id)}
          onDelete={id => removeItem('explorations', id)}
          renderMeta={e => `${STATUS_LABELS[e.status] || e.status} · ${e.domain || '—'}`}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="admin-page-header">
        <button className="admin-back-btn" onClick={close}>← Retour</button>
        <h1 className="admin-page-title">{editing === 'new' ? 'Nouvelle exploration' : `Modifier — ${form.name}`}</h1>
      </div>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-card">
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Nom *</label>
              <input className="admin-form__input" required value={form.name}
                onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Statut</label>
              <select className="admin-form__select" value={form.status}
                onChange={e => handleChange('status', e.target.value)}>
                {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Sous-titre</label>
            <input className="admin-form__input" value={form.subtitle}
              onChange={e => handleChange('subtitle', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Description</label>
            <textarea className="admin-form__textarea" rows={4} value={form.description}
              onChange={e => handleChange('description', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Domaine</label>
            <input className="admin-form__input" value={form.domain}
              onChange={e => handleChange('domain', e.target.value)}
              placeholder="ex. Mobile, Visualisation de données…" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Technologies envisagées</label>
            <ArrayEditor value={form.technologies} onChange={v => handleChange('technologies', v)}
              placeholder="React Native…" />
          </div>
          <label className="admin-checkbox">
            <input type="checkbox" checked={form.visible}
              onChange={e => handleChange('visible', e.target.checked)} />
            <span>Visible publiquement</span>
          </label>
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
