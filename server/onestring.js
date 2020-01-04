const fs = require('fs')
const dbPath = './db-original.json'

let rawDb = fs.readFileSync(dbPath, 'utf-8' )
const parsedDb = JSON.parse(rawDb)
let writeString = ' '
for(let item in parsedDb){
    writeString += item + ' '
}

console.log(writeString.match("משתנת"))