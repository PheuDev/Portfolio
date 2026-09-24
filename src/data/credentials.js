/* ============================================================
   CREDENTIALS — Diplômes, certifications, badges, formations
   Types : 'diplome' | 'certification' | 'badge' | 'formation'
   visible: false  → masqué publiquement
   ============================================================ */

export const credentials = [
  {
    id: 'licence-info',
    type: 'diplome',
    name: 'Licence en Informatique',
    organization: 'Université / [Établissement]',
    period: '20XX — 20XX',
    description: 'Formation généraliste en informatique — algorithmes, bases de données, développement logiciel, réseaux.',
    verifyUrl: '',      // lien de vérification si disponible
    documentUrl: '',    // document public si publiable
    visible: false,     // masqué jusqu'à mise à jour des informations réelles
    order: 1,
  },

  // ── Certifications ──────────────────────────────────────
  // Exemple à compléter :
  // {
  //   id: 'cert-js',
  //   type: 'certification',
  //   name: 'JavaScript Algorithms and Data Structures',
  //   organization: 'freeCodeCamp',
  //   period: '20XX',
  //   description: '',
  //   verifyUrl: '',
  //   documentUrl: '',
  //   visible: true,
  //   order: 1,
  // },

  // ── Badges ──────────────────────────────────────────────
  // Exemple à compléter :
  // {
  //   id: 'badge-github',
  //   type: 'badge',
  //   name: 'Git & GitHub',
  //   organization: 'GitHub / [Plateforme]',
  //   period: '20XX',
  //   description: '',
  //   verifyUrl: '',
  //   documentUrl: '',
  //   visible: false,
  //   order: 1,
  // },
]

/* Labels lisibles pour les types */
export const credentialTypes = [
  { id: 'diplome',        label: 'Formations & Diplômes'           },
  { id: 'certification',  label: 'Certifications'                  },
  { id: 'badge',          label: 'Badges & Formations complémentaires' },
  { id: 'formation',      label: 'Formations'                      },
]
