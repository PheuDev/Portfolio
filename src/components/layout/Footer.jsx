/* ============================================================
   Footer — Pied de page
   ============================================================ */

import { Link } from 'react-router-dom'
import { useData } from '@/context/DataContext'
import './Footer.css'

const currentYear = new Date().getFullYear()

const FOOTER_LINKS = [
  { to: '/projets',      label: 'Projets'      },
  { to: '/a-propos',     label: 'À propos'     },
  { to: '/services',     label: 'Services'     },
  { to: '/explorations', label: 'Explorations' },
  { to: '/contact',      label: 'Contact'      },
]

export function Footer() {
  const { identity } = useData()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">

          {/* ── Identité ── */}
          <div className="footer__brand">
            <div className="footer__name-group">
              <span className="footer__name">{identity.fullName}</span>
              <span className="footer__nickname" aria-hidden="true">
                {identity.nickname}
              </span>
            </div>
            <p className="footer__tagline">{identity.tagline}</p>
          </div>

          {/* ── Navigation ── */}
          <nav className="footer__nav" aria-label="Navigation du bas de page">
            <p className="footer__nav-title">Navigation</p>
            <ul role="list">
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Contact & Réseaux ── */}
          <div className="footer__contact">
            <p className="footer__nav-title">Contact</p>
            {identity.email && (
              <a href={`mailto:${identity.email}`} className="footer__link footer__email">
                {identity.email}
              </a>
            )}
            {identity.links && identity.links.filter(l => l.url).length > 0 && (
              <div className="footer__socials">
                {identity.links.filter(l => l.url).map(link => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={link.label}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Bas de footer ── */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {identity.fullName}
            <span className="footer__separator" aria-hidden="true"> · </span>
            <span className="footer__credit" aria-hidden="true">{identity.nickname}</span>
          </p>
          <p className="footer__made-with">
            Conçu et développé avec soin.
          </p>
        </div>
      </div>
    </footer>
  )
}
