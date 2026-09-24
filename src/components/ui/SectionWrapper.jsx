/* ============================================================
   SectionWrapper — Masque automatiquement une section vide
   
   Règle fondamentale : une section sans contenu n'apparaît pas.
   Passe items (tableau) ou hasContent (booléen).
   Si vide → ne rend rien du tout.
   ============================================================ */

export function SectionWrapper({ children, items, hasContent, className = '' }) {
  // Détermine si la section a du contenu
  const isEmpty = (() => {
    if (hasContent !== undefined) return !hasContent
    if (Array.isArray(items)) return items.length === 0
    return false
  })()

  if (isEmpty) return null

  return (
    <section className={className}>
      {children}
    </section>
  )
}
