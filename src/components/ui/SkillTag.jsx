/* ============================================================
   SkillTag — Affiche une compétence avec son niveau
   ============================================================ */

import './SkillTag.css'

const LEVEL_CONFIG = {
  'maitrise':       { label: 'Maîtrise',        className: 'skill--mastery'    },
  'bonne-pratique': { label: 'Bonne pratique',  className: 'skill--good'       },
  'experience':     { label: 'Expérience',      className: 'skill--experience' },
  'notions':        { label: 'Notions',         className: 'skill--notions'    },
  'apprentissage':  { label: 'En apprentissage',className: 'skill--learning'   },
}

export function SkillTag({ skill, showLevel = false }) {
  const levelConfig = LEVEL_CONFIG[skill.level] || LEVEL_CONFIG['notions']

  return (
    <div className={`skill-tag ${levelConfig.className}`}>
      <span className="skill-tag__name">{skill.name}</span>
      {showLevel && (
        <span className="skill-tag__level">{levelConfig.label}</span>
      )}
    </div>
  )
}
