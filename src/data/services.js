/* ============================================================
   SERVICES — Ce que je peux proposer professionnellement
   visible: false  → masqué publiquement
   ============================================================ */

export const services = [
  {
    id: 'dev-web',
    title: 'Développement d\'applications web',
    description:
      'Conception et développement d\'applications web modernes, performantes et adaptées à vos besoins. Du prototype à la mise en production.',
    benefit: 'Une application fiable, maintenable et pensée pour durer.',
    technologies: ['React', 'Node.js', 'JavaScript', 'PostgreSQL'],
    icon: 'web',
    visible: true,
    order: 1,
  },
  {
    id: 'dev-frontend',
    title: 'Développement Frontend',
    description:
      'Interfaces utilisateur modernes et accessibles. Intégration de maquettes, composants React réutilisables, expérience fluide sur tous les appareils.',
    benefit: 'Des interfaces claires, réactives et agréables à utiliser.',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    icon: 'frontend',
    visible: true,
    order: 2,
  },
  {
    id: 'dev-backend',
    title: 'Développement Backend',
    description:
      'APIs RESTful, logique métier, gestion de bases de données. Architecture propre et documentation claire.',
    benefit: 'Un backend robuste, documenté et facile à faire évoluer.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MySQL'],
    icon: 'backend',
    visible: true,
    order: 3,
  },
  {
    id: 'conception',
    title: 'Conception de systèmes de gestion',
    description:
      'Analyse du besoin, modélisation des données, conception de l\'architecture applicative. Avant même d\'écrire une ligne de code.',
    benefit: 'Une base solide pour construire une application qui tient dans le temps.',
    technologies: ['Modélisation de données', 'Architecture applicative', 'SQL'],
    icon: 'design',
    visible: true,
    order: 4,
  },
  {
    id: 'maintenance',
    title: 'Maintenance et amélioration',
    description:
      'Reprise de projets existants, correction de bugs, amélioration des performances, ajout de fonctionnalités.',
    benefit: 'Un code existant remis en état, amélioré et prêt à évoluer.',
    technologies: ['React', 'Node.js', 'PHP', 'JavaScript'],
    icon: 'maintenance',
    visible: true,
    order: 5,
  },
  {
    id: 'conseil',
    title: 'Conseil et accompagnement',
    description:
      'Aide à la définition d\'un projet, choix technologiques, revue de code, accompagnement technique sur un projet numérique.',
    benefit: 'Des décisions techniques éclairées, adaptées à votre contexte.',
    technologies: [],
    icon: 'consult',
    visible: true,
    order: 6,
  },
]
