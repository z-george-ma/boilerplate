/// <reference path="typings/index.d.ts"/>

import * as resources from "./lib/resources"
import * as fs from "fs"
import * as stream from "stream"
import * as sqlite from "./lib/sqlite"
import * as async from "./lib/async"
import * as location from "./lib/location"

let unrender = require("unrender")

let parse = unrender(fs.readFileSync("src/lib/template.tpl", 'utf8'))

let execute = async (dbFile) => {
  let contact = await resources.contact('contact.csv')
  let rate = await resources.rate('tutor_rate.csv')
  
  let newDb = !fs.existsSync(dbFile)
  let db = new sqlite.Database(dbFile)
  
  
  if (newDb) {
    await db.run(`create table tutorFinder (id int, location text, city text, rateMin int, rateMax int, phone text, email text)`)
  }
  
  let sqlInsert = db.prepare("insert into tutorFinder values($id, $location, $city, $rateMin, $rateMax, $phone, $email)")
  
  let files = fs.readdirSync('/Users/gma/Downloads/tutorfinder/')
  
  let parseFile = async (f: string) => {
    if (f.indexOf("detail.php-TutorID") == 0) {
      let data = fs.readFileSync("/Users/gma/Downloads/tutorfinder/" + f, "binary")  
      let ret = parse(data);
      ret.rateRange = rate[ret.id.toString()] || null
      let ct = contact[ret.id.toString()]
      let loc = await location.parse(ret.location)
          
      await db.run(sqlInsert, {
        $id: ret.id,
        $location: JSON.stringify(loc),
        $rateMin: ret.rateRange ? ret.rateRange.low : null,
        $rateMax: ret.rateRange ? ret.rateRange.high : null,
        $phone: ct ? ct.phone : null,
        $email: ct ? ct.email : null
      })
    }
  }
  
  await db.run('begin')

  await async.map(files, parseFile)
  
  await db.run('commit')
}

execute('db.db').catch(e => console.log(e))
