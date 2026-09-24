/* ============================================================
   AdminSkills — Gestion des compétences
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { AdminItemList } from '@/components/admin/shared/AdminItemList'
import '@/components/admin/shared/AdminItemList.css'

const LEVELS = ['maitrise', 'bonne-pratique', 'experience', 'notions', 'apprentissage']
const LEVEL_LABELS = {
  'maitrise': 'Maîtrise', 'bonne-pratique': 'Bonne pratique',
  'experience': 'Expérience', 'notions': 'Notions', 'apprentissage': 'En apprentissage',
}

const EMPTY_SKILL = {
  id: '', name: '', category: 'frontend', level: 'experience',
  icon: '', visible: true, order: 99,
}

function generateId(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)
}

export function AdminSkills() {
  const { rawData, meta, addItem, updateItem, removeItem, toggleVisibility } = useData()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_SKILL)
  const [saved, setSaved] = useState(false)

  function openNew() { setForm({ ...EMPTY_SKILL }); setEditing('new'); setSaved(false) }
  function openEdit(skill) { setForm({ ...skill }); setEditing(skill); setSaved(false) }
  function close() { setEditing(null); setForm(EMPTY_SKILL) }
  function handleChange(f, v) { setSaved(false); setForm(prev => ({ ...prev, [f]: v })) }

  function handleSave(e) {
    e.preventDefault()
    const id = form.id || generateId(form.name)
    const toSave = { ...form, id }
    if (editing === 'new') addItem('skills', toSave)
    else updateItem('skills', toSave.id, toSave)
    setSaved(true)
    setTimeout(() => { setSaved(false); close() }, 1000)
  }

  if (!editing) {
    return (
      <div>
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 className="admin-page-title">Compétences</h1>
            <p className="admin-page-subtitle">{rawData.skills.length} compétence(s) au total.</p>
          </div>
          <button className="admin-action-btn admin-action-btn--primary" onClick={openNew}>
            + Ajouter
          </button>
        </div>
        <AdminItemList
          items={rawData.skills}
          onEdit={openEdit}
          onToggleVisibility={id => toggleVisibility('skills', id)}
          onDelete={id => removeItem('skills', id)}
          renderMeta={s => `${meta.skillCategories.find(c => c.id === s.category)?.label || s.category} · ${LEVEL_LABELS[s.level] || s.level}`}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="admin-page-header">
        <button className="admin-back-btn" onClick={close}>← Retour</button>
        <h1 className="admin-page-title">{editing === 'new' ? 'Nouvelle compétence' : `Modifier — ${form.name}`}</h1>
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
              <label className="admin-form__label">Catégorie</label>
              <select className="admin-form__select" value={form.category}
                onChange={e => handleChange('category', e.target.value)}>
                {meta.skillCategories.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Niveau</label>
              <select className="admin-form__select" value={form.level}
                onChange={e => handleChange('level', e.target.value)}>
                {LEVELS.map(l => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
              </select>
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Ordre</label>
              <input className="admin-form__input" type="number" value={form.order}
                onChange={e => handleChange('order', parseInt(e.target.value) || 99)}
                style={{ maxWidth: '120px' }} />
            </div>
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
