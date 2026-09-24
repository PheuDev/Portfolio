/* ============================================================
   useTypewriter — Texte dynamique avec effet machine à écrire
   
   Cycle sur un tableau de mots/phrases :
   1. Écrit lettre par lettre
   2. Pause
   3. Efface lettre par lettre
   4. Passe au mot suivant

   Paramètres :
     words        : string[]  — liste des mots/phrases à cycler
     typeSpeed    : number    — ms entre chaque frappe (défaut 80)
     deleteSpeed  : number    — ms entre chaque suppression (défaut 45)
     pauseAfter   : number    — ms de pause après écriture complète (défaut 1800)
     pauseBefore  : number    — ms de pause avant de retaper (défaut 400)

   Retourne :
     { text, isTyping, isDone }
     text      : string  — texte courant à afficher
     isTyping  : bool    — true pendant la frappe
     isDone    : bool    — true lors de la pause (mot complet affiché)

   Respecte prefers-reduced-motion : si activé, retourne le premier
   mot statiquement sans animation.
   ============================================================ */

import { useState, useEffect, useRef } from 'react'

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useTypewriter({
  words = [],
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseAfter = 1800,
  pauseBefore = 400,
} = {}) {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isDone, setIsDone] = useState(false)

  // Retourne le premier mot statiquement si l'utilisateur préfère
  // moins de mouvement — aucun timer, aucun re-render superflu
  if (prefersReducedMotion()) {
    return { text: words[0] ?? '', isTyping: false, isDone: true }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const wordIndex = useRef(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const charIndex = useRef(0)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const deleting = useRef(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const timer = useRef(null)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!words.length) return

    function tick() {
      const currentWord = words[wordIndex.current]

      if (!deleting.current) {
        // ── Frappe ──
        charIndex.current += 1
        setText(currentWord.slice(0, charIndex.current))
        setIsTyping(true)
        setIsDone(false)

        if (charIndex.current === currentWord.length) {
          // Mot complet → pause avant suppression
          setIsTyping(false)
          setIsDone(true)
          timer.current = setTimeout(() => {
            deleting.current = true
            tick()
          }, pauseAfter)
          return
        }
      } else {
        // ── Suppression ──
        charIndex.current -= 1
        setText(currentWord.slice(0, charIndex.current))
        setIsTyping(false)
        setIsDone(false)

        if (charIndex.current === 0) {
          // Mot effacé → passe au suivant après courte pause
          deleting.current = false
          wordIndex.current = (wordIndex.current + 1) % words.length
          timer.current = setTimeout(tick, pauseBefore)
          return
        }
      }

      const speed = deleting.current ? deleteSpeed : typeSpeed
      timer.current = setTimeout(tick, speed)
    }

    // Démarre après un court délai pour laisser les autres animations
    // d'entrée du hero se terminer d'abord
    timer.current = setTimeout(tick, 900)

    return () => clearTimeout(timer.current)
  // Les mots ne changent pas en cours de vie — dépendances stables
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { text, isTyping, isDone }
}
