# Dépôt unique pour le serveur et le backoffice de l'application web

Pour cet ECF Studi, j'ai créé un seul dépôt qui contient le code de la partie serveur et celui de la partie backoffice. Vous trouverez ci-dessous les instructions pour lancer le serveur et le backoffice.

## Serveur

### En local

Pour lancer le serveur en local, il faut tout d'abord clôner ce dépôt.

Il faut vous assurer d'avoir installé `node` et `npm` et d'avoir de quoi lancer des conteneurs docker (`podman` et `podman-compose` par exemple).

Ensuite, il faut se déplacer dans le dossier `server` dans votre terminal (`cd ecf-studi/server`) et lancer la commande `npm i` pour installer les dépendances.

Vous pourrez lancer le conteneur de la base de données, initialiser cette dernière et la remplir avec des données de base en lançant simplement la commande `npm run env` (en ajoutant `-- --docker` si vous utilisez docker au lieu de podman) dans votre terminal.

Pour finir, il suffira de lancer la commande `npm run tsstart` pour que le serveur commence à écouter sur le port 3003.

#### Créer votre compte administrateur pour le backoffice

Vous pouvez simplement générer le hash du mot de passe souhaité en lançant la commande `echo -n <votre mot de passe> | md5` dans votre terminal en remplaçant `<votre mot de passe>` par le mot de passe souhaité. Le terminal affichera alors le hash.

Vous pouvez ensuite ajouter vos informations à la suite de celles exstantes dans la section dédiée à la table `Users` dans le fichier [populate.sql](server/src/database/populate.sql#l10) en utilisant le hash récupéré précédemment pour le champs `pwdHash`. Utilisez le `accountType` 1 pour un compte administrateur et 2 pour un compte employé, sans oublier de sauvegarder les modifications.

Pour finir, vous pouvez lancer la commande `npm run env:restart` (en ajoutant `-- --docker` si vous utilisez docker) dans `ecf-studi/server` dans votre terminal pour redémarrer le conteneur et remplir la base de données avec ces nouvelles données.

Il vous faudra interrompre le serveur et le relancer avec `npm run tsstart` s'il tournait déjà.

### En ligne

Le serveur est déployé sur un droplet Digital Ocean et il n'est donc pas nécessaire de le faire tourner en local pour tester les applications publique et backoffice. Cela dit et dans ce cas, il ne sera pas possible de modifier la base de donnée directement pour créer votre compte administrateur et le moyen le plus simple et sécurisé sera alors d'utiliser les identifiants de Vincent Parrot qui sont notés dans le PDF de la documentation technique.

## Backoffice

### En local

Pour lancer le backoffice en local, il faut tout d'abord clôner ce dépôt.

Il faut vous assurer d'avoir installé `node` et `npm`.

Le backoffice et l'application publique sont paramétrés par défaut pour faire leurs appels API au serveur en ligne. Si vous souhaitez les faire communiquer avec le serveur local, il vous faudra modifier le proxy dans [package.json](backoffice/package.json#l5) et utiliser `http://localhost:3003` au lieu de `https://64.226.72.248` (64.226.72.248 étant l'adresse IP du droplet Digital Ocean).

Il suffira ensuite, dans votre terminal, de vous déplacer dans le dossier `backoffice` (`cd ecf-studi/backoffice`) et de lancer la commande `npm start`, ce qui lancera le server Webpack du backoffice et ouvrira l'app dans votre navigateur.
