/* ============================================================
   NotFound — Page 404
   Affichée pour toute URL inconnue.
   ============================================================ */

import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import './NotFound.css'

export function NotFound() {
  useDocumentTitle('Page introuvable', 'Cette page n\'existe pas ou a été déplacée.')

  return (
    <div className="notfound">
      <div className="container notfound__inner">
        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 className="notfound__title">Page introuvable</h1>
        <p className="notfound__text">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="notfound__link">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
