/* ============================================================
   AUTH — Configuration de l'accès administration
   
   Le code d'accès n'est JAMAIS stocké en clair ici.
   Seul son hash SHA-256 est présent dans ce fichier.
   
   Pour changer le code d'accès :
   1. Ouvre la console du navigateur
   2. Lance : await crypto.subtle.digest('SHA-256', new TextEncoder().encode('ton-nouveau-code'))
      .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2,'0')).join(''))
   3. Remplace la valeur de ACCESS_CODE_HASH ci-dessous par le résultat
   
   Hash actuel = code d'accès initial configuré lors de la mise en place.
   ============================================================ */

// Hash SHA-256 du code d'accès "ashé"
// Généré via : sha256("ashé")
export const ACCESS_CODE_HASH = '035c263a66fe5bf9ee5de1a3714ee86bda4e0a43743c8a23ea18d0c42486579f'

// Durée de session admin en millisecondes (2 heures)
export const SESSION_DURATION_MS = 2 * 60 * 60 * 1000

// Clé de stockage de la session dans sessionStorage
export const SESSION_KEY = 'pheu_admin_session'

// Nombre maximum de tentatives avant blocage temporaire
export const MAX_ATTEMPTS = 5

// Durée du blocage après trop de tentatives (5 minutes)
export const LOCKOUT_DURATION_MS = 5 * 60 * 1000

// Clé pour stocker les tentatives échouées
export const ATTEMPTS_KEY = 'pheu_admin_attempts'
