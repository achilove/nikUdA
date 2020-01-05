const fs = require('fs')
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const dbPath = process.env.DBPATH? './' + process.env.DBPATH: './db-original.json'
const port = process.env.PORT || 3000

const app = express();

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];


app.use(cors())

fs.readFile(dbPath, 'utf-8', (err, rawDb)=>{
    if(err){
        console.log('Server is not start')
        console.log(`Make shure the db is in ${dbPath}`)
    }else{
        // start server
        const parsedDb = JSON.parse(rawDb)

        
        app.listen(port, function () {
            console.log(`Server listening on port ${port}!`);
        });
        app
        .use(bodyParser.json())
        
        app.get('*', (req, res) => {
            if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
              res.sendFile(path.resolve(`public/${req.url}`));
            } else {
              res.sendFile(path.resolve('public/index.html'));
            }
          });

        app.post('/api/v1/naked', function(req, res) {
            for(let reqItem of req.body){
                if(parsedDb[reqItem["Naked"]]){

                    // in original server db items were duplicated
                    /*
                     if(parsedDb[reqItem["Naked"]].length == 1){
                         reqItem["Nikudim"] = parsedDb[reqItem["Naked"]]
                     }
                     if(parsedDb[reqItem["Naked"]].length > 1){
                         reqItem["Nikudim"] = [...parsedDb[reqItem["Naked"]],...parsedDb[reqItem["Naked"]]]
                     }
                    */

                    reqItem["Nikudim"] = parsedDb[reqItem["Naked"]]
                }else{
                    reqItem["Nikudim"] = []
                }
            }
            res.json(req.body);
        });

        app.post('/api/v1/suggest', function(req, res) {
            req.body['Nakeds'] = []
            let bodyWordParam = req.body['Naked']
            let searchWord = bodyWordParam.substring(bodyWordParam.length-3,bodyWordParam.length)
                for(let dbItem in parsedDb){
                   
                    let cuttedDbItem = dbItem.substring(dbItem.length-3, dbItem.length)

                    if(cuttedDbItem == searchWord){
                        req.body['Nakeds'].push(dbItem)
                    }
                }
            res.json(req.body);
        });

        app.post('/api/v2/naked', function(req, res) {
            // req.body is array of arrays
            let response = []
            for(let reqItem of req.body){
                let innerArray = []
                for(let word of reqItem){
                    if(/[אבגדהוזחטיכךלמםנןסעפףצץקרשתְֱֲֳִֵֶַָֹֻּׁׂ]/g.test(word)){
                        if(parsedDb[word]){
                            innerArray.push({
                                Naked: word,
                                Nikudim: parsedDb[word]
                            })
                        }else{
                            innerArray.push({
                                Naked: word,
                                Nikudim: []
                            })
                        } 
                    }else{
                        innerArray.push({
                            Naked: word,
                            Nikudim: null
                        })
                    }
                }
                response.push(innerArray)
            }
            res.json(response);
        });
    }
})

