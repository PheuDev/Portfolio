/* ============================================================
   AdminProjects — Gestion des projets
   ============================================================ */

import { useState } from 'react'
import { useData } from '@/context/DataContext'
import { AdminItemList } from '@/components/admin/shared/AdminItemList'
import '@/components/admin/shared/AdminItemList.css'

const STATUSES = [
  'realise', 'en-cours', 'en-developpement', 'prototype',
  'experimental', 'concept', 'a-venir',
]
const STATUS_LABELS = {
  'realise': 'Réalisé', 'en-cours': 'En cours',
  'en-developpement': 'En développement', 'prototype': 'Prototype',
  'experimental': 'Expérimental', 'concept': 'Concept', 'a-venir': 'À venir',
}

const EMPTY_PROJECT = {
  id: '', slug: '', name: '', subtitle: '', shortDescription: '',
  longDescription: '', category: 'application-web', status: 'concept',
  featured: false, visible: true, order: 99,
  problem: '', context: '', objective: '', solution: '',
  features: [], plannedFeatures: [],
  architecture: '', technologies: [],
  challenges: [], learnings: [],
  images: [], websiteUrl: '', githubUrl: '', demoUrl: '', period: '',
}

function generateId(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)
}

/* Éditeur de tableau de strings (features, techs, etc.) */
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
        <input
          className="admin-form__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder}
        />
        <button type="button" className="admin-action-btn admin-action-btn--primary" onClick={add}>
          +
        </button>
      </div>
    </div>
  )
}

export function AdminProjects() {
  const { rawData, addItem, updateItem, removeItem, toggleVisibility } = useData()
  const [editing, setEditing] = useState(null) // null | 'new' | project object
  const [form, setForm] = useState(EMPTY_PROJECT)
  const [saved, setSaved] = useState(false)

  function openNew() {
    setForm({ ...EMPTY_PROJECT })
    setEditing('new')
    setSaved(false)
  }

  function openEdit(project) {
    setForm({ ...project })
    setEditing(project)
    setSaved(false)
  }

  function closeEditor() {
    setEditing(null)
    setForm(EMPTY_PROJECT)
  }

  function handleChange(field, value) {
    setSaved(false)
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave(e) {
    e.preventDefault()
    const id = form.id || generateId(form.name)
    const slug = form.slug || id
    const toSave = { ...form, id, slug }

    if (editing === 'new') {
      addItem('projects', toSave)
    } else {
      updateItem('projects', toSave.id, toSave)
    }
    setSaved(true)
    setTimeout(() => { setSaved(false); closeEditor() }, 1000)
  }

  /* ── Liste ── */
  if (!editing) {
    return (
      <div>
        <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 className="admin-page-title">Projets</h1>
            <p className="admin-page-subtitle">{rawData.projects.length} projet(s) au total.</p>
          </div>
          <button className="admin-action-btn admin-action-btn--primary" onClick={openNew}>
            + Ajouter un projet
          </button>
        </div>

        <AdminItemList
          items={rawData.projects}
          onEdit={openEdit}
          onToggleVisibility={id => toggleVisibility('projects', id)}
          onDelete={id => removeItem('projects', id)}
          renderMeta={p => `${STATUS_LABELS[p.status] || p.status} · ${p.period || '—'}`}
        />
      </div>
    )
  }

  /* ── Formulaire ── */
  return (
    <div>
      <div className="admin-page-header">
        <button className="admin-back-btn" onClick={closeEditor}>← Retour aux projets</button>
        <h1 className="admin-page-title">
          {editing === 'new' ? 'Nouveau projet' : `Modifier — ${form.name}`}
        </h1>
      </div>

      <form className="admin-form" onSubmit={handleSave}>

        <div className="admin-card">
          <h2 className="admin-section-title">Informations générales</h2>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Nom *</label>
              <input className="admin-form__input" required value={form.name}
                onChange={e => handleChange('name', e.target.value)} />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Sous-titre</label>
              <input className="admin-form__input" value={form.subtitle}
                onChange={e => handleChange('subtitle', e.target.value)} />
            </div>
          </div>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">Statut</label>
              <select className="admin-form__select" value={form.status}
                onChange={e => handleChange('status', e.target.value)}>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Période</label>
              <input className="admin-form__input" value={form.period}
                onChange={e => handleChange('period', e.target.value)}
                placeholder="ex. 2024 — en cours" />
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Description courte</label>
            <textarea className="admin-form__textarea" rows={3} value={form.shortDescription}
              onChange={e => handleChange('shortDescription', e.target.value)} />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Description longue</label>
            <textarea className="admin-form__textarea" rows={6} value={form.longDescription}
              onChange={e => handleChange('longDescription', e.target.value)} />
          </div>
          <div className="admin-form__group" style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--space-4)' }}>
            <label className="admin-checkbox">
              <input type="checkbox" checked={form.featured}
                onChange={e => handleChange('featured', e.target.checked)} />
              <span>Mis en avant (page d'accueil)</span>
            </label>
            <label className="admin-checkbox">
              <input type="checkbox" checked={form.visible}
                onChange={e => handleChange('visible', e.target.checked)} />
              <span>Visible publiquement</span>
            </label>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">Récit du projet</h2>
          {[
            { field: 'problem',  label: 'Problème'  },
            { field: 'context',  label: 'Contexte'  },
            { field: 'objective',label: 'Objectif'  },
            { field: 'solution', label: 'Solution'  },
            { field: 'architecture', label: 'Architecture' },
          ].map(({ field, label }) => (
            <div key={field} className="admin-form__group">
              <label className="admin-form__label">{label}</label>
              <textarea className="admin-form__textarea" rows={3} value={form[field] || ''}
                onChange={e => handleChange(field, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">Fonctionnalités</h2>
          <div className="admin-form__group">
            <label className="admin-form__label">Fonctionnalités disponibles</label>
            <ArrayEditor value={form.features} onChange={v => handleChange('features', v)}
              placeholder="Ajouter une fonctionnalité…" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Fonctionnalités prévues</label>
            <ArrayEditor value={form.plannedFeatures} onChange={v => handleChange('plannedFeatures', v)}
              placeholder="Ajouter une fonctionnalité prévue…" />
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">Technologies & Enseignements</h2>
          <div className="admin-form__group">
            <label className="admin-form__label">Technologies</label>
            <ArrayEditor value={form.technologies} onChange={v => handleChange('technologies', v)}
              placeholder="Ajouter une technologie…" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Difficultés rencontrées</label>
            <ArrayEditor value={form.challenges} onChange={v => handleChange('challenges', v)}
              placeholder="Ajouter une difficulté…" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Ce que j'en ai appris</label>
            <ArrayEditor value={form.learnings} onChange={v => handleChange('learnings', v)}
              placeholder="Ajouter un enseignement…" />
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title">Liens</h2>
          <div className="admin-form__group">
            <label className="admin-form__label">Site du projet</label>
            <span className="admin-form__sublabel">
              Lien principal, mis en évidence sur la page du projet. Laisser vide si le site n'est pas en ligne.
            </span>
            <input className="admin-form__input" type="url" value={form.websiteUrl || ''}
              onChange={e => handleChange('websiteUrl', e.target.value)}
              placeholder="https://mon-projet.com" />
          </div>
          <div className="admin-form__grid-2">
            <div className="admin-form__group">
              <label className="admin-form__label">GitHub</label>
              <input className="admin-form__input" type="url" value={form.githubUrl}
                onChange={e => handleChange('githubUrl', e.target.value)}
                placeholder="https://github.com/…" />
            </div>
            <div className="admin-form__group">
              <label className="admin-form__label">Démonstration</label>
              <input className="admin-form__input" type="url" value={form.demoUrl}
                onChange={e => handleChange('demoUrl', e.target.value)}
                placeholder="https://…" />
            </div>
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Images</label>
            <span className="admin-form__sublabel">
              Place les images dans <code>public/assets/projects/</code> et indique les chemins.
            </span>
            <ArrayEditor value={form.images} onChange={v => handleChange('images', v)}
              placeholder="/assets/projects/nom-projet/image.png" />
          </div>
          <div className="admin-form__group">
            <label className="admin-form__label">Ordre d'affichage</label>
            <input className="admin-form__input" type="number" value={form.order}
              onChange={e => handleChange('order', parseInt(e.target.value) || 99)}
              style={{ maxWidth: '120px' }} />
          </div>
        </div>

        <div className="admin-form__actions">
          <button type="submit" className="admin-action-btn admin-action-btn--primary">
            {saved ? '✓ Enregistré' : (editing === 'new' ? 'Créer le projet' : 'Enregistrer')}
          </button>
          <button type="button" className="admin-action-btn" onClick={closeEditor}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
