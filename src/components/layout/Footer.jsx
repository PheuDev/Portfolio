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

const SOCIAL_PLATFORMS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <path d="M5.2 3.5a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0ZM2 8h3v14H2V8Zm7 0h2.9v1.9h.1A3.2 3.2 0 0 1 15 7.7c3.2 0 3.8 2.1 3.8 4.9V22h-3v-8.3c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22H8V8Z" />,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L0 24l6.4-1.7a11.8 11.8 0 0 0 5.7 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.5-8.5ZM12.1 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.5-4.4 9.9-9.8 9.9Zm5.4-7.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3.1 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />,
  },
  {
    id: 'github',
    label: 'GitHub',
    icon: <path fillRule="evenodd" d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.4 3.9 1.8.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3.1 1.1a10.8 10.8 0 0 1 5.6 0c2.1-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .4.2.7.8.6A11.2 11.2 0 0 0 12 .8Z" clipRule="evenodd" />,
  },
]

export function Footer() {
  const { identity } = useData()
  const socialLinks = SOCIAL_PLATFORMS.map(platform => {
    const configuredLink = identity.links?.find(link => link.label.toLowerCase() === platform.label.toLowerCase())
    const phoneNumber = identity.phone?.replace(/\D/g, '')

    return {
      ...platform,
      href: platform.id === 'whatsapp'
        ? phoneNumber ? `https://wa.me/${phoneNumber}` : ''
        : configuredLink?.url || '',
    }
  }).filter(link => link.href)

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
            {socialLinks.length > 0 && (
              <nav className="footer__socials" aria-label="Réseaux sociaux">
                {socialLinks.map(link => (
                  <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="footer__social-link" aria-label={link.label} title={link.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      {link.icon}
                    </svg>
                  </a>
                ))}
              </nav>
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
        </div>
      </div>
    </footer>
  )
}
