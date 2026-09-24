/* ============================================================
   AdminExperience — Gestion des expériences professionnelles
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { AdminItemList } from '@/components/admin/shared/AdminItemList'
import '@/components/admin/shared/AdminItemList.css'

const TYPES = ['emploi', 'stage', 'freelance', 'personnel']
const TYPE_LABELS = { emploi: 'Emploi', stage: 'Stage', freelance: 'Freelance', personnel: 'Personnel' }

const EMPTY = {
  id: '', title: '', organization: '', type: 'emploi',
  period: '', location: '', description: '',
  responsibilities: [], achievements: [], technologies: [],
  visible: true, order: 99,
}

function generateId(title) {
  return ('exp-' + title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')).slice(0, 40)
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

export function AdminExperience() {
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
    const id = form.id || generateId(form.title)
    const toSave = { ...form, id }
    if (editing === 'new') addItem('experience', toSave)
    else updateItem('experience', toSave.id, toSave)
    setSaved(true)
    setTimeout(() => { setSaved(false); close() }, 1000)
  }

  if (!editing) {
    return (
      <div>
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 className="admin-page-title">Expérience</h1>
            <p className="admin-page-subtitle">{rawData.experience.length} expérience(s).</p>
          </div>
          <button className="admin-action-btn admin-action-btn--primary" onClick={openNew}>+ Ajouter</button>
        </div>
        <AdminItemList
          items={rawData.experience}
          onEdit={openEdit}
          onToggleVisibility={id => toggleVisibility('experience', id)}
          onDelete={id => removeItem('experience', id)}
          renderMeta={e => `${TYPE_LABELS[e.type] || e.type} · ${e.organization} · ${e.period}`}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="admin-page-header">
        <button className="admin-back-btn" onClick={close}>← Retour</button>
        <h1 className="admin-page-title">{editing === 'new' ? 'Nouvelle expérience' : `Modifier — ${form.title}`}</h1>
      </div>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-card">
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Titre du poste *</label>
              <input className="admin-form__input" required value={form.title}
                onChange={e => handleChange('title', e.target.value)} />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Type</label>
              <select className="admin-form__select" value={form.type}
                onChange={e => handleChange('type', e.target.value)}>
                {TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Organisation</label>
              <input className="admin-form__input" value={form.organization}
                onChange={e => handleChange('organization', e.target.value)} />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Période</label>
              <input className="admin-form__input" value={form.period}
                onChange={e => handleChange('period', e.target.value)}
                placeholder="2023 — 2024" />
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Localisation</label>
            <input className="admin-form__input" value={form.location}
              onChange={e => handleChange('location', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Description</label>
            <textarea className="admin-form__textarea" rows={4} value={form.description}
              onChange={e => handleChange('description', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Responsabilités</label>
            <ArrayEditor value={form.responsibilities} onChange={v => handleChange('responsibilities', v)}
              placeholder="Ajouter une responsabilité…" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Réalisations notables</label>
            <ArrayEditor value={form.achievements} onChange={v => handleChange('achievements', v)}
              placeholder="Ajouter une réalisation…" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Technologies</label>
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
