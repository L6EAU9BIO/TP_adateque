## Le fil rouge de la semaine

Cette semaine, tu construis une application complète, de zéro : une base de données, une API, puis une interface web. En quatre demi-journées.
Le sujet est volontairement petit — deux tables — pour que tu puisses aller jusqu'au bout de la chaîne sans te noyer. C'est le chemin qui compte, pas le domaine.

### 🎬 L'ADATHÈQUE

Une petite médiathèque veut cataloguer ses films. Deux tables suffisent : les genres, et les films qui appartiennent chacun à un genre.
À la fin de la semaine, tu auras : une base peuplée, une API REST documentée, et une page web qui affiche, filtre et ajoute des films.

### ⚠️ C'EST UN PROJET D'ENTRAÎNEMENT, PAS ADAPI

Tu travailles dans un dossier séparé. Ce que tu construis ici ne sera pas rendu — mais tout ce que tu y apprends s'applique directement à Adapi et au projet des deux dernières semaines.
L'intérêt de repartir de zéro : tu refais toute la chaîne, sans rien reprendre d'existant.

# 02 La base de données

## EXERCICE 1 — LE SCHÉMA

Crée un dossier adatheque, un docker-compose.yml et une base adatheque.
Puis écris schema.sql avec deux tables :
genre — un identifiant, un libellé (unique, obligatoire)
film — un identifiant, un titre, une année, une durée en minutes, un support, une disponibilité (booléen, vrai par défaut), et une clé étrangère vers le genre
Le support est un enum : dvd, bluray, numerique. Sa valeur par défaut est dvd.

## EXERCICE 2 — LES MIGRATIONS

Écris aussi migration_down.sql, et vérifie que le cycle up → down → up passe deux fois de suite.

### ⚠️ Attention à l'ordre : le type enum se crée en premier et se supprime en dernier.

## EXERCICE 3 — LE SEED

Écris seed.sql : au moins 5 genres et 12 films, avec des supports variés et quelques films indisponibles.
Des vrais titres, avec des vraies années — ça rendra la suite plus agréable à regarder.
Vérifie : SELECT COUNT(*) FROM film; renvoie au moins 12.

## EXERCICE 4 — UNE REQUÊTE DE CONTRÔLE

Avant de passer à l'API, écris cette requête en SQL pur :
le nombre de films et la durée moyenne, par genre, du plus fourni au moins fourni
Si elle fonctionne, ta base est bien conçue. Tu la réutiliseras à l'exercice 10.

# 03 L'API en lecture

## EXERCICE 5 — LE SERVEUR

Initialise un projet Node, installe express, pg, dotenv et cors.
Crée db.js avec le pool, un .env (dans le .gitignore), et un index.js qui démarre.

⚠️ app.use(cors()) dès maintenant : tu en auras besoin demain, autant l'installer tout de suite.

## EXERCICE 6 — LES LISTES

GET /genres — la liste des genres, par ordre alphabétique.
GET /films — la liste des films avec, pour chacun, le libellé de son genre et non son identifiant. Il te faut une jointure.

## EXERCICE 7 — LA FICHE

GET /films/:id — un film avec son genre.
404 si l'id n'existe pas. Teste-le.

## EXERCICE 8 — LA ROUTE IMBRIQUÉE

GET /genres/:id/films — les films d'un genre donné, triés par année.
Question : en quoi cette route diffère-t-elle de GET /films?genre_id=3 ? Écris ta réponse en commentaire.

# 04 Filtres et tri

## EXERCICE 9 — LES FILTRES COMBINABLES

Fais que GET /films accepte deux filtres optionnels et combinables :
?genre_id=1 et ?disponible=true
Une seule requête SQL, aucune concaténation. Indice : COALESCE.
Vérifie les trois cas : sans filtre, avec un seul, avec les deux.

## EXERCICE 10 — LE TRI

Ajoute ?tri=titre, ?tri=annee, ?tri=duree.

⚠️ Un paramètre $1 ne peut pas remplacer un nom de colonne. Utilise une liste blanche.
Teste l'attaque : envoie ?tri=n'importe quoi et vérifie que ça retombe sur le tri par défaut sans erreur.

## EXERCICE 11 — LES STATISTIQUES

GET /stats — la requête de l'exercice 4, servie en JSON.
CHECKPOINT DE FIN DE MATINÉE
☐ Deux tables, un enum, un cycle up→down→up qui passe
☐ Une base peuplée d'au moins 12 films
☐ Six routes qui répondent : /genres, /films, /films/:id, /genres/:id/films, /stats
☐ Deux filtres combinables et un tri sécurisé
☐ Aucune concaténation SQL
Garde tout ça : demain, une page web viendra s'y brancher.