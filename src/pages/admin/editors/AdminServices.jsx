/* ============================================================
   AdminServices — Gestion des services proposés
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { AdminItemList } from '@/components/admin/shared/AdminItemList'
import '@/components/admin/shared/AdminItemList.css'

const ICONS = ['web', 'frontend', 'backend', 'design', 'maintenance', 'consult']

const EMPTY_SERVICE = {
  id: '', title: '', description: '', benefit: '',
  technologies: [], icon: 'web', visible: true, order: 99,
}

function generateId(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)
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

export function AdminServices() {
  const { rawData, addItem, updateItem, removeItem, toggleVisibility } = useData()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_SERVICE)
  const [saved, setSaved] = useState(false)

  function openNew() { setForm({ ...EMPTY_SERVICE }); setEditing('new'); setSaved(false) }
  function openEdit(s) { setForm({ ...s }); setEditing(s); setSaved(false) }
  function close() { setEditing(null); setForm(EMPTY_SERVICE) }
  function handleChange(f, v) { setSaved(false); setForm(prev => ({ ...prev, [f]: v })) }

  function handleSave(e) {
    e.preventDefault()
    const id = form.id || generateId(form.title)
    const toSave = { ...form, id }
    if (editing === 'new') addItem('services', toSave)
    else updateItem('services', toSave.id, toSave)
    setSaved(true)
    setTimeout(() => { setSaved(false); close() }, 1000)
  }

  if (!editing) {
    return (
      <div>
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 className="admin-page-title">Services</h1>
            <p className="admin-page-subtitle">{rawData.services.length} service(s) au total.</p>
          </div>
          <button className="admin-action-btn admin-action-btn--primary" onClick={openNew}>+ Ajouter</button>
        </div>
        <AdminItemList
          items={rawData.services}
          onEdit={openEdit}
          onToggleVisibility={id => toggleVisibility('services', id)}
          onDelete={id => removeItem('services', id)}
          renderMeta={s => s.benefit || ''}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="admin-page-header">
        <button className="admin-back-btn" onClick={close}>← Retour</button>
        <h1 className="admin-page-title">{editing === 'new' ? 'Nouveau service' : `Modifier — ${form.title}`}</h1>
      </div>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-card">
          <div className="admin-form__group">
            <label className="admin-form__label">Titre *</label>
            <input className="admin-form__input" required value={form.title}
              onChange={e => handleChange('title', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Description</label>
            <textarea className="admin-form__textarea" rows={4} value={form.description}
              onChange={e => handleChange('description', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Bénéfice apporté</label>
            <input className="admin-form__input" value={form.benefit}
              onChange={e => handleChange('benefit', e.target.value)}
              placeholder="Ce que ça apporte concrètement…" />
          </div>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Icône</label>
              <select className="admin-form__select" value={form.icon}
                onChange={e => handleChange('icon', e.target.value)}>
                {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Ordre</label>
              <input className="admin-form__input" type="number" value={form.order}
                onChange={e => handleChange('order', parseInt(e.target.value) || 99)}
                style={{ maxWidth: '120px' }} />
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Technologies associées</label>
            <ArrayEditor value={form.technologies} onChange={v => handleChange('technologies', v)}
              placeholder="React, Node.js…" />
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
