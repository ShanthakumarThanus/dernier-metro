# 🚇 Projet Dernier Métro — Paris

## 🎯 Contexte

Imaginez Lina : il est **00:58**, elle sort d’un concert à **Châtelet**.  
Elle doit prendre la **ligne 1**.  
👉 A-t-elle le temps d’attraper le **dernier métro** ?

Ce projet propose une **mini API Express** qui simule les passages de métro et indique si c’est la dernière rame.  
Pas de données temps réel : les horaires sont fictifs pour se concentrer sur les fondamentaux backend et la containerisation avec **Docker**.

---

## ⚡ Fonctionnalités (MVP)

### `GET /health`
Vérifie que l’API répond  
Réponse :
```json
{ "status": "ok" }

GET /next-metro?station=NAME
```

Retourne l’horaire du prochain métro
Exemple :

{
  "station": "Chatelet",
  "line": "M7",
  "nextArrival": "23:58",
  "isLast": false,
  "headwayMin": 3,
  "tz": "Europe/Paris"
}

Règles métier simulées

Plage de service : 05:30 → 01:15

Fréquence (headway) : toutes les 3 minutes

Dernière rame : entre 00:45 et 01:15 → isLast: true

Hors service :

{ "service": "closed", "tz": "Europe/Paris" }

❌ Gestion des erreurs

Station manquante :

{ "error": "missing station" }

Route inexistante :

{ "error": "route not found" }

🛠️ Lancer en local

Installer les dépendances et démarrer le serveur :

npm install
npm start

Par défaut, l’API écoute sur le port 3000.

http://localhost:3000/health

http://localhost:3000/next-metro?station=Chatelet

🐳 Lancer avec Docker

Construire l’image :

docker build -f Dockerfile.v1 -t dernier-metro:1 .

Lancer le conteneur :

docker run --rm -p 3001:3000 dernier-metro:1

Tester :

http://localhost:3001/health

http://localhost:3001/next-metro?station=Chatelet

docker run --rm -p 3001:3000 dernier-metro:1

📂 Structure du projet

dernier-metro/
├── Dockerfile.v1
├── .dockerignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
