/* ============================================================
   useDocumentTitle — Met à jour le <title> et la meta description
   de la page courante.

   Utilisation :
     useDocumentTitle('Projets')
     useDocumentTitle('KYN — Projet', 'Description du projet…')

   Le suffixe " — Phanuel DAVODOUN" est ajouté automatiquement
   sauf si `standalone` est true (ex : AdminLogin).
   ============================================================ */

import { useEffect } from 'react'

const SITE_SUFFIX = 'Phanuel DAVODOUN'
const DEFAULT_DESCRIPTION =
  'Portfolio de Phanuel DAVODOUN — Développeur Web Full Stack basé au Bénin.'

export function useDocumentTitle(title, description, { standalone = false } = {}) {
  useEffect(() => {
    // Titre
    document.title = standalone ? title : `${title} — ${SITE_SUFFIX}`

    // Meta description
    const desc = description || DEFAULT_DESCRIPTION
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', desc)
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc  = document.querySelector('meta[property="og:description"]')
    if (ogTitle) ogTitle.setAttribute('content', document.title)
    if (ogDesc)  ogDesc.setAttribute('content', desc)

    // Nettoyage : restaure le titre par défaut quand le composant est démonté
    return () => {
      document.title = `Portfolio — ${SITE_SUFFIX}`
    }
  }, [title, description, standalone])
}
