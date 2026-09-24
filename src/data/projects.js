/* ============================================================
   PROJECTS — Projets réalisés, en cours et concepts
   Statuts disponibles :
     'realise' | 'en-cours' | 'prototype' | 'experimental'
     | 'en-developpement' | 'concept' | 'a-venir'
   visible: false  → masqué publiquement, conservé en admin
   featured: true  → affiché sur la page d'accueil
   ============================================================ */

export const projects = [
  {
    id: 'kyn',
    slug: 'kyn',
    name: 'KYN',
    subtitle: 'Family Knowledge Network',
    shortDescription: "Plateforme de gestion et de visualisation des relations familiales et de l'histoire familiale.",
    longDescription: `KYN (Know Your Network) est une application permettant de modéliser, gérer et visualiser un réseau familial complet.

L'application repose sur une représentation en graphe des relations entre les membres de la famille, permettant une navigation intuitive et une visualisation riche de l'histoire familiale.`,
    category: 'application-web',
    status: 'en-cours',
    featured: true,
    visible: true,
    order: 1,

    problem: "Les outils de généalogie existants sont soit trop complexes, soit trop limités pour représenter fidèlement la richesse des relations familiales et de leur histoire.",
    context: "Projet personnel né d'un besoin réel de centraliser et visualiser des données familiales dispersées dans différents formats.",
    objective: "Créer une plateforme permettant de construire, enrichir et explorer un arbre familial dynamique avec une dimension historique.",
    solution: "Une application web basée sur un modèle de graphe relationnel, avec une interface de visualisation interactive et un système de fiches détaillées pour chaque membre.",

    features: [
      'Gestion des membres de la famille',
      'Visualisation en forme de graphe interactif',
      'Fiches détaillées par individu',
      'Relations multiples (parent, conjoint, enfant…)',
      'Gestion des sources de données médias',
    ],
    plannedFeatures: [
      'Export des données (PDF, GEDCOM)',
      'Collaboration multi-utilisateurs',
      'Recherche avancée et filtres',
      'Carte géographique des origines',
    ],

    architecture: "Frontend React avec visualisation de graphe. Backend Node.js/Express. Base de données relationnelle PostgreSQL avec modélisation des relations.",
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'D3.js'],

    challenges: [
      "Modélisation d'un graphe de relations complexes en base de données relationnelle",
      'Performance de la visualisation sur des arbres de grande taille',
    ],
    learnings: [
      'Modélisation avancée de données relationnelles',
      'Visualisation de graphes avec D3.js',
      "Conception d'une API RESTful robuste",
    ],

    images: [],
    websiteUrl: '',
    githubUrl: '',
    demoUrl: '',
    period: '2024 — en cours',
  },

  {
    id: 'flexiloan',
    slug: 'flexiloan',
    name: 'FlexiLoan',
    subtitle: 'Microcredit Management Platform',
    shortDescription: "Plateforme de gestion de microcrédits — clients, prêts, remboursements, échéances, intérêts et pénalités.",
    longDescription: `FlexiLoan est une application de gestion complète pour les organismes de microcrédit.

Elle permet de gérer le cycle de vie complet d'un prêt : de la demande à la clôture, en passant par le suivi des échéances, le calcul des intérêts et la gestion des retards.`,
    category: 'application-web',
    status: 'realise',
    featured: true,
    visible: true,
    order: 2,

    problem: "Les organismes de microcrédit manquent d'outils adaptés à leur taille et à leurs besoins spécifiques, souvent contraints d'utiliser des tableurs ou des logiciels génériques coûteux.",
    context: 'Projet développé pour répondre à un besoin concret de gestion de prêts à petite échelle.',
    objective: "Fournir une plateforme simple, fiable et complète pour gérer l'ensemble du cycle de vie des microcrédits.",
    solution: 'Application web full-stack avec une gestion centralisée des clients, des contrats de prêt, des plans de remboursement et des alertes.',

    features: [
      'Gestion des clients et dossiers',
      'Création et suivi des prêts',
      'Plans de remboursement automatiques',
      'Calcul des intérêts et pénalités de retard',
      'Tableau de bord avec indicateurs clés',
      'Historique des transactions',
    ],
    plannedFeatures: [
      'Export PDF des contrats',
      'Notifications de rappel',
      'Rapports statistiques avancés',
    ],

    architecture: 'Frontend React. Backend Node.js/Express. Base de données PostgreSQL. Architecture MVC côté serveur.',
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL'],

    challenges: [
      'Calcul précis des intérêts composés et pénalités',
      'Gestion des cas de remboursement anticipé',
    ],
    learnings: [
      'Logique métier financière et modélisation de données',
      "Conception d'interfaces métier orientées efficacité",
    ],

    images: [],
    websiteUrl: '',
    githubUrl: '',
    demoUrl: '',
    period: '2024',
  },

  {
    id: 'nexus',
    slug: 'nexus',
    name: 'NEXUS',
    subtitle: 'Personal Control Center',
    shortDescription: 'Application personnelle de gestion et de visualisation de données — dashboard, tâches, transactions et indicateurs.',
    longDescription: `NEXUS est un tableau de bord personnel centralisé permettant de suivre et visualiser différents aspects de sa vie numérique et personnelle.

L'application agrège des données de plusieurs domaines (finances, tâches, objectifs) pour offrir une vue synthétique et actionnable.`,
    category: 'application-web',
    status: 'en-cours',
    featured: true,
    visible: true,
    order: 3,

    problem: 'Les données personnelles (finances, tâches, objectifs) sont dispersées dans plusieurs outils qui ne communiquent pas entre eux.',
    context: "Projet personnel conçu comme un espace de contrôle centralisé, inspiré par le besoin d'une vue d'ensemble cohérente.",
    objective: "Créer un tableau de bord personnel modulaire capable d'agréger et de visualiser différentes catégories de données personnelles.",
    solution: "Application React avec une architecture modulaire permettant d'ajouter facilement de nouveaux modules de données et de visualisation.",

    features: [
      'Dashboard avec indicateurs personnalisables',
      'Gestion des tâches et objectifs',
      'Suivi des transactions personnelles',
      'Visualisations graphiques',
    ],
    plannedFeatures: [
      'Modules additionnels (habitudes, projets…)',
      'Synchronisation entre appareils',
      'Notifications et rappels',
    ],

    architecture: "Frontend React avec architecture modulaire. Données locales dans un premier temps, avec prévision d'une synchronisation cloud.",
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'],

    challenges: [
      "Conception d'une architecture modulaire extensible",
      'Visualisations de données performantes',
    ],
    learnings: [
      'Architecture de composants modulaires en React',
      'Visualisation de données sans bibliothèques lourdes',
    ],

    images: [],
    websiteUrl: '',
    githubUrl: '',
    demoUrl: '',
    period: '2024 — en cours',
  },

  {
    id: 'uniconnect',
    slug: 'uniconnect',
    name: 'UniConnect',
    subtitle: 'University Platform',
    shortDescription: "Plateforme universitaire centralisant différents services et interactions autour de l'université.",
    longDescription: "UniConnect (aussi appelé UniLink) est un projet de plateforme universitaire visant à unifier les services numériques d'un établissement : communications, ressources, agenda, interactions entre étudiants et personnels.",
    category: 'application-web',
    status: 'concept',
    featured: true,
    visible: true,
    order: 4,

    problem: "Les universités utilisent de nombreux outils disparates (mails, portails, forums, agendas) qui fragmentent l'expérience de l'étudiant et du personnel.",
    context: "Projet de conception né de l'observation des lacunes des outils numériques universitaires actuels.",
    objective: "Proposer une plateforme unifiée rassemblant l'ensemble des services numériques d'une université dans une interface cohérente.",
    solution: 'Architecture de plateforme modulaire avec une API centrale et des modules fonctionnels indépendants.',

    features: [],
    plannedFeatures: [
      'Portail étudiant unifié',
      'Messagerie interne',
      'Gestion des ressources pédagogiques',
      'Agenda partagé',
      'Espace de collaboration',
    ],

    architecture: "Conception architecturale en cours. Prévision d'une API REST centrale avec des modules frontend indépendants.",
    technologies: ['React', 'Node.js', 'PostgreSQL'],

    challenges: [],
    learnings: [],

    images: [],
    websiteUrl: '',
    githubUrl: '',
    demoUrl: '',
    period: 'Concept — 2024',
  },
]
