/* ============================================================
   EXPERIENCE — Expériences professionnelles et personnelles
   visible: false  → masqué publiquement
   ============================================================ */

export const experiences = [
  // Exemple à compléter :
  // {
  //   id: 'exp-1',
  //   title: 'Développeur Web',
  //   organization: '[Organisation / Entreprise]',
  //   type: 'emploi',         // 'emploi' | 'stage' | 'freelance' | 'personnel'
  //   period: '20XX — 20XX',
  //   location: '',
  //   description: 'Description du poste ou de la mission.',
  //   responsibilities: [
  //     'Responsabilité 1',
  //     'Responsabilité 2',
  //   ],
  //   achievements: [
  //     'Réalisation notable 1',
  //   ],
  //   technologies: ['React', 'Node.js'],
  //   visible: true,
  //   order: 1,
  // },
  {
    id: 'exp-independant',
    title: 'Développeur indépendant',
    organization: 'Projets personnels',
    type: 'personnel',
    period: '20XX — aujourd\'hui',
    location: 'Bénin',
    description: 'Développement de projets personnels en apprentissage continu — KYN, FlexiLoan, NEXUS.',
    responsibilities: [
      'Conception et développement full-stack',
      'Modélisation de données',
      'Architecture d\'applications',
    ],
    achievements: [],
    technologies: ['React', 'Node.js', 'JavaScript', 'PostgreSQL'],
    visible: false,     // masqué jusqu'à mise à jour de la période réelle
    order: 1,
  },
]
