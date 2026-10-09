# Configuration Supabase

Le portfolio continue d’utiliser ses fichiers `src/data/*.js` comme données de départ. Quand Supabase est configuré, les domaines enregistrés dans `portfolio_content` remplacent ces valeurs pour tous les visiteurs. Sans configuration Supabase, le mode local existant avec `localStorage` est conservé.

Pour continuer à ouvrir `/admin` en développement sans Supabase, renseigne `VITE_LOCAL_ADMIN_CODE` dans `.env.local`. Ce code n’est accepté que par le serveur Vite en développement ; ne le configure jamais sur l’hébergement de production.

## 1. Créer la base

Crée un projet Supabase, puis exécute le contenu de `supabase/setup.sql` dans le SQL Editor du projet.

## 2. Créer le compte administrateur

Dans Supabase, désactive l’inscription publique et crée ton compte utilisateur depuis Authentication. Ensuite, dans le SQL Editor, attribue-lui le rôle administrateur en remplaçant l’adresse e-mail ci-dessous :

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'ton-adresse@example.com';
```

Déconnecte-toi puis reconnecte-toi après avoir attribué le rôle. Les règles RLS refusent toute écriture à un compte sans ce rôle.

## 3. Configurer l’application

Copie `.env.example` vers `.env.local`, puis renseigne l’URL du projet et sa clé `anon`/publishable depuis les paramètres API Supabase. Ces deux valeurs sont publiques et prévues pour le frontend ; **n’utilise jamais la clé `service_role` ici**.

Renseigne les mêmes variables d’environnement dans la plateforme d’hébergement, puis redéploie. Les modifications faites depuis `/admin` seront alors enregistrées dans Supabase et visibles par les autres visiteurs.

## Anciennes modifications locales

Les données `localStorage` sont propres à une origine et ne sont pas transférées automatiquement. Depuis l’administration connectée sur le même navigateur et la même origine que l’ancien stockage, l’action « Importer les modifications locales » importe les domaines encore absents de Supabase. Elle ne remplace jamais un domaine déjà partagé.

Les contenus masqués restent accessibles dans la réponse JSON publique, comme ils l’étaient déjà dans le bundle frontend avant cette migration. « Masqué » signifie non affiché, pas confidentiel : ne place pas de données secrètes dans ces champs.