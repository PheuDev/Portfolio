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

  // ── Titre et accroche ────────────────────────────────────
  title:    'Développeur Web Full Stack',
  tagline:  'Je conçois et développe des applications web modernes, utiles et durables.',

  // ── Présentation courte (hero, cartes) ───────────────────
  shortBio: 'Je transforme des idées en solutions concrètes, en combinant rigueur technique et sens du produit.',

  // ── Présentation longue (page À propos) ─────────────────
  longBio: `Je suis développeur web passionné par la création d'applications utiles, esthétiques et performantes.
J'aime résoudre des problèmes, approcher de nouvelles technologies et transformer des idées en résultats concrets.

Ce qui m'intéresse dans le développement, c'est la conception autant que l'implémentation : comprendre un problème avant de coder, choisir une architecture adaptée, construire quelque chose qui tient dans le temps.`,

  // ── Philosophie ──────────────────────────────────────────
  philosophy: `Un bon code n'est pas celui qui m'impressionne, mais celui qui se comprend, se maintient et sert un objectif.`,

  // ── Localisation ─────────────────────────────────────────
  location: 'Benin',

  // ── Contact ──────────────────────────────────────────────
  email:    'eliedavodoun@gmail.com',   // à remplacer
  phone:    '+229 01 66 51 70 39',                       // optionnel, laisser vide si non souhaité

  // ── Réseaux et liens ─────────────────────────────────────
  links: [
    // Renseigne tes vraies URLs ci-dessous.
    // Laisser url: '' masque automatiquement le lien dans l'interface.
    { label: 'GitHub',   url: '', icon: 'github'   },
    { label: 'LinkedIn', url: '', icon: 'linkedin' },
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
