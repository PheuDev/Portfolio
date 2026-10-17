/* ============================================================
   IDENTITY — Informations personnelles et professionnelles
   Modifie ce fichier pour mettre à jour ton profil.
   ============================================================ */

export const identity = {
  // ── Identité principale ──────────────────────────────────
  firstName: 'Phanuel',
  lastName:  'DAVODOUN',
  fullName:  'Phanuel DAVODOUN',       // utilisé pour l'affichage principal
  nickname:  'Pheu',              // signature secondaire

  // ── Titre professionnel ─────────────────────────────────
  title:    'Développeur Web Full Stack',

  // ── Présentation courte (hero, cartes) ───────────────────
  shortBio: 'Je pars d’un besoin concret, j’en clarifie les contraintes, puis je construis une application pensée pour être utilisée et faire évoluer.',

  // ── Présentation longue (page À propos) ─────────────────
  longBio: `Je m'appelle Phanuel. J'aime partir d'un besoin réel et comprendre ce qui le rend difficile avant de choisir une solution.

Sur KYN, mon projet personnel en cours, je travaille à représenter des liens familiaux et à rendre leur exploration claire. Ce travail m'amène à faire dialoguer modèle de données, architecture et interface.

Je cherche à rejoindre une équipe où je peux contribuer à des applications web concrètes, apprendre au contact d'autres développeurs et livrer des fonctionnalités utiles. Je reste aussi ouvert aux projets clients, du cadrage à la réalisation.`,

  // ── Philosophie ──────────────────────────────────────────
  philosophy: `Un bon code n'est pas celui qui m'impressionne, mais celui qui se comprend, se maintient et sert un objectif.`,

  // ── Localisation ─────────────────────────────────────────
  location: 'Benin',

  // ── Contact ──────────────────────────────────────────────
  email:    'eliedavodoun@gmail.com',
  phone:    '+229 01 66 51 70 39',                       // optionnel, laisser vide si non souhaité

  // ── Réseaux et liens ─────────────────────────────────────
  links: [
    // Laisser url: '' masque automatiquement le lien dans l'interface.
    { label: 'GitHub',   url: 'https://github.com/PheuDev', icon: 'github'   },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/elie-davodoun-96a548340/?isSelfProfile=true', icon: 'linkedin' },
    // Ajoute d'autres liens ici (Twitter/X, portfolio alternatif, etc.)
  ],

  // ── Disponibilité et opportunités ────────────────────────
  // Mettre visible à false pour masquer cette section publiquement
  availability: {
    visible: true,
    status: 'Disponible',   // ex. : 'Disponible', 'En poste', 'En recherche active'
    types: [
      { label: 'Emploi',          active: true  },
      { label: 'Stage',           active: true  },
      { label: 'Freelance',       active: true  },
      { label: 'Collaboration',   active: true  },
    ],
    note: 'Ouvert aux opportunités intéressantes. N\'hésite pas à me contacter.',
  },

  // ── Traits professionnels (affichés sur la page À propos) ─
  traits: [
    { label: 'Développeur Web',     sublabel: 'Front & Back-end'      },
    { label: 'Apprentissage continu', sublabel: 'Toujours en évolution' },
    { label: 'Esprit d\'analyse',   sublabel: 'Curieux et rigoureux'   },
    { label: 'Orienté solutions',   sublabel: 'Pragmatique et créatif' },
  ],
}
