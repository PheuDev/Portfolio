/* ============================================================
   useReveal — Animation d'apparition au scroll
   Utilise IntersectionObserver pour ajouter la classe .visible
   sur les éléments portant la classe .reveal
   ============================================================ */

import { useEffect } from 'react'

/* Décalage appliqué aux éléments révélés dans la même passe :
   crée une cascade d'apparition au lieu d'un bloc qui surgit d'un coup. */
const STAGGER_MS = 70

export function useReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    // Navigateur sans IntersectionObserver → on affiche tout immédiatement
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let step = 0

        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const el = entry.target

          // Un délai explicite posé par la page (ex. grilles) est respecté.
          // Sinon on en calcule un pour obtenir une entrée en cascade.
          if (!el.style.getPropertyValue('--reveal-delay')) {
            el.style.setProperty('--reveal-delay', `${step * STAGGER_MS}ms`)
            step += 1
          }

          el.classList.add('visible')
          // Animation one-shot : on arrête d'observer une fois visible
          observer.unobserve(el)
        })
      },
      {
        /* Déclenche dès qu'un pixel entre dans le viewport */
        threshold: 0,
        /* Déclenche quand l'élément est à 80px du bord bas de l'écran —
           l'utilisateur voit clairement l'animation avant d'arriver dessus */
        rootMargin: '0px 0px -80px 0px',
      }
    )

    /* On laisse le navigateur peindre l'état initial (opacité 0) avant
       d'observer. Sans ce délai, les deux états sont calculés dans la même
       image et la transition CSS n'est jamais jouée. */
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        elements.forEach(el => observer.observe(el))
      })
    })

    /* Filet de sécurité : si un élément est dans l'écran mais n'a jamais été
       révélé (observer manqué, layout tardif…), on le rend visible. */
    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        }
      })
    }, 1200)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(safety)
      observer.disconnect()
    }
  // deps : ré-observe après un changement de contenu (ex. filtres de projets)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
