# Climb-Guide
# Lancer l'Application Web

Cette section détaille les étapes nécessaires pour lancer notre application web. Suivez attentivement les instructions ci-dessous pour démarrer les deux serveurs et visualiser l'application dans le navigateur.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir :
- **Node.js** : [Télécharger et installer Node.js](https://nodejs.org/)
- **npm** : inclus avec Node.js.
- **Live Server** : Extension Visual Studio Code pour servir des fichiers HTML localement.

---

## Étapes pour lancer l'application

### 1. Lancer le premier serveur 
1. Ouvrez **Visual Studio Code**.
2. Dans le terminal intégré (ou un autre terminal), accédez au répertoire racine de votre projet où se trouve le fichier `server.js`. Par exemple : ```cd /path/to/your/project```
3. Lancez le serveur backend avec la commande suivante : ```node server.js ```
   - Cette commande démarre le serveur backend sur le **port 5000**.
- Si tout fonctionne correctement, vous devriez voir un message similaire dans le terminal :
  ```
  Server is listening to port 5000
  ```

---


### 2. Lancer le deuxième serveur 
1. Ouvrez un **nouveau terminal** dans Visual Studio Code (ou utilisez un autre terminal).
2. Accédez au répertoire contenant la deuxième page de l'application, par exemple : ```cd /path/to/your/project/Climb-Guide/page-de-refuges```
3. Installez les dépendances nécessaires si ce n'est pas encore fait : ```npm install```
4. Lancez le serveur de la deuxième page avec la commande suivante :```npm run dev```
   - Vous devriez voir un message similaire dans le terminal :
  ```
  > gestion-refuges@1.0.0 dev
  > nodemon server/index.js

  [nodemon] 3.1.9
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,cjs,json
  [nodemon] starting `node server/index.js`
  {
    user: 'postgres',
    host: 'localhost',
    database: 'gestion des refuges ',
    password: 'mot de passe',
    port: '5432'
  }
  ```

---
### 3. Ouvrir le fichier `index.html` avec Live Server
1. Dans Visual Studio Code, cliquez avec le bouton droit sur le fichier **`index.html`**.
2. Sélectionnez **Open with Live Server** dans le menu contextuel.
3. Cela ouvrira automatiquement l'application dans votre navigateur par défaut.
---
## Notes supplémentaires
- **Backend (API1)** : [http://localhost:5000](http://localhost:5000)
- **Backend (API2)** : [http://localhost:4000](http://localhost:4000)
- **Interface Web** : Servie avec **Live Server**.






