# nikUdA
**Hebrew vowels interactive**
**Test task for Enikova Nadejda**

 
[Backend](https://github.com/achilove/nikUdA/tree/master/server) - node.js, express, jsondb
[Frontend](https://github.com/achilove/nikUdA/tree/master/client) - angular, material

Test task description:
Есть сервис: [https://nikuda.co.il](https://nikuda.co.il/), который помогает проставлять огласовки в иврите.
Он не очень удобный, но выполняет свою функцию. Нужно переделать его так, чтобы он стал удобным в использовании.
Это включает в себя дизайн и удобство, поскольку мы считаем, что программист должен владеть этими навыками на определенном уровне.

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