const fs = require('fs')
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')

const dbPath = process.env.DBPATH? './' + process.env.DBPATH: './db-original.json'
const port = process.env.PORT || 3000

const app = express();

fs.readFile(dbPath, 'utf-8', (err, rawDb)=>{
    if(err){
        console.log('Server is not start')
        console.log(`Make shure the db is in ${dbPath}`)
    }else{
        // start server
        const parsedDb = JSON.parse(rawDb)

        app.use(bodyParser.json())
        app.listen(port, function () {
            console.log(`Server listening on port ${port}!`);
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
    }
})

