/* ============================================================
   EXPLORATIONS — Idées, concepts et projets futurs
   Statuts : 'idee' | 'exploration' | 'concept' | 'a-venir'
   Ces éléments ne sont JAMAIS mélangés aux projets réalisés.
   visible: false  → masqué publiquement
   ============================================================ */

export const explorations = [
  {
    id: 'app-mobile',
    name: 'Application mobile',
    subtitle: 'Version mobile de NEXUS',
    description:
      'Explorer le développement mobile avec React Native pour porter NEXUS sur iOS et Android.',
    status: 'idee',
    domain: 'Mobile',
    technologies: ['React Native', 'JavaScript'],
    visible: true,
    order: 1,
  },
  {
    id: 'graph-proto',
    name: 'Moteur de graphe',
    subtitle: 'Prototype de visualisation avancée',
    description:
      'Expérimentation sur un moteur de rendu de graphes pour des visualisations de relations complexes — applicable à KYN et d\'autres projets.',
    status: 'exploration',
    domain: 'Visualisation de données',
    technologies: ['D3.js', 'Canvas', 'JavaScript'],
    visible: true,
    order: 2,
  },
  {
    id: 'systeme-proto-controle',
    name: 'Système de prototypage rapide',
    subtitle: 'Outil interne',
    description:
      'Concevoir un générateur de structure applicative pour accélérer le démarrage de nouveaux projets React + Node.js avec une architecture cohérente.',
    status: 'concept',
    domain: 'Outils développeur',
    technologies: ['Node.js', 'JavaScript'],
    visible: true,
    order: 3,
  },
  {
    id: 'plateforme-freelancing',
    name: 'Plateforme de freelancing',
    subtitle: 'Concept — marché local',
    description:
      'Concept de plateforme mettant en relation des développeurs et des clients locaux pour des missions courtes et ciblées.',
    status: 'concept',
    domain: 'Plateforme',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    visible: true,
    order: 4,
  },
]
