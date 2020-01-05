# nikUdA
**Hebrew vowels interactive**
**Test task for Enikova Nadejda**

 
[Backend](https://github.com/achilove/nikUdA/tree/master/server) - node.js, express, jsondb
[Frontend](https://github.com/achilove/nikUdA/tree/master/client) - angular, material


### For production use
prepare frontend build
```sh
$ cd client
$ npm install -g @angular/cli
$ npm install
$ ng build --prod
```

prepare server
```sh
$ cd server
$ mv .env.example .env
```
open .env and set PORT
run server
```sh
$ npm run start
```