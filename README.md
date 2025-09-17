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
Vérifie que l’API répond.  
Réponse :
```json
{ "status": "ok" }
```

### `GET /next-metro?station=NAME`

Retourne l’horaire du prochain métro.

Exemple :

```json
{
  "station": "Chatelet",
  "line": "M7",
  "nextArrival": "23:58",
  "isLast": false,
  "headwayMin": 3,
  "tz": "Europe/Paris"
}
```

### Règles métier simulées

Plage de service : 05:30 → 01:15

Fréquence (headway) : toutes les 3 minutes

Dernière rame : entre 00:45 et 01:15 → isLast: true

Hors service :
```json
{ "service": "closed", "tz": "Europe/Paris" }
```

### ❌ Gestion des erreurs

Station manquante :

Station manquante :
```json
{ "error": "missing station" }
```

Station manquante :
```json
{ "error": "route not found" }
```

### 🛠️ Lancer en local (Node.js)

Installer les dépendances et démarrer le serveur :
```json
npm install
node .\server.js
```

Par défaut, l’API écoute sur le port 3000.

http://localhost:3000/health
http://localhost:3000/next-metro?station=Chatelet

### 🐳 Lancer avec Docker
Construire l’image
```json
docker build -f Dockerfile.v1 -t dernier-metro:1 .
```

### Lancer le conteneur
```json
docker run --rm -p 3001:3000 dernier-metro:1
```

### Tester
http://localhost:3001/health
http://localhost:3001/next-metro?station=Chatelet

## 📦 Lancer avec Docker Compose (API + Swagger UI)

Avec Docker Compose, l’API et la documentation Swagger UI tournent ensemble.
```json
docker compose up -d --build
```

API disponible sur : http://localhost:5000
Swagger UI : http://localhost:8080

### ⚠️ Note importante : le projet intègre CORS pour que Swagger UI (port 8080) puisse appeler l’API (port 5000).

### 📂 Structure du projet
dernier-metro/
├── Dockerfile.v1
├── .dockerignore
├── docker-compose.yml
├── openapi/
│   └── openapi.yaml
├── package.json
├── package-lock.json
├── server.js
└── README.md




