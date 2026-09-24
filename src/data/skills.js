/* ============================================================
   SKILLS — Compétences techniques
   Niveaux disponibles :
     'maitrise' | 'bonne-pratique' | 'experience' | 'notions' | 'apprentissage'
   visible: false  → masqué publiquement
   ============================================================ */

export const skills = [
  // ── Développement Frontend ──────────────────────────────
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    level: 'maitrise',
    icon: 'js',
    visible: true,
    order: 1,
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    level: 'maitrise',
    icon: 'react',
    visible: true,
    order: 2,
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    level: 'maitrise',
    icon: 'html',
    visible: true,
    order: 3,
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    level: 'maitrise',
    icon: 'css',
    visible: true,
    order: 4,
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'frontend',
    level: 'bonne-pratique',
    icon: 'vite',
    visible: true,
    order: 5,
  },

  // ── Développement Backend ───────────────────────────────
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 'bonne-pratique',
    icon: 'nodejs',
    visible: true,
    order: 1,
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    level: 'bonne-pratique',
    icon: 'express',
    visible: true,
    order: 2,
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    level: 'experience',
    icon: 'php',
    visible: true,
    order: 3,
  },

  // ── Données ─────────────────────────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'data',
    level: 'bonne-pratique',
    icon: 'postgresql',
    visible: true,
    order: 1,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'data',
    level: 'experience',
    icon: 'mysql',
    visible: true,
    order: 2,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'data',
    level: 'bonne-pratique',
    icon: 'sql',
    visible: true,
    order: 3,
  },
  {
    id: 'data-modeling',
    name: 'Modélisation de données',
    category: 'data',
    level: 'bonne-pratique',
    icon: 'data',
    visible: true,
    order: 4,
  },

  // ── Outils & Environnement ──────────────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 'bonne-pratique',
    icon: 'git',
    visible: true,
    order: 1,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    level: 'bonne-pratique',
    icon: 'github',
    visible: true,
    order: 2,
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    level: 'notions',
    icon: 'docker',
    visible: true,
    order: 3,
  },
  {
    id: 'vscode',
    name: 'VS Code / Kiro',
    category: 'tools',
    level: 'maitrise',
    icon: 'vscode',
    visible: true,
    order: 4,
  },
]

/* Labels lisibles pour les catégories */
export const skillCategories = [
  { id: 'frontend', label: 'Développement Frontend' },
  { id: 'backend',  label: 'Développement Backend'  },
  { id: 'data',     label: 'Données'                },
  { id: 'tools',    label: 'Outils & Environnement' },
]

/* Labels lisibles pour les niveaux */
export const skillLevels = {
  'maitrise':      { label: 'Maîtrise',          order: 1 },
  'bonne-pratique':{ label: 'Bonne pratique',    order: 2 },
  'experience':    { label: 'Expérience',        order: 3 },
  'notions':       { label: 'Notions',           order: 4 },
  'apprentissage': { label: 'En apprentissage',  order: 5 },
}
