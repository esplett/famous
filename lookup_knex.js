// settings.json
const settings = require("./settings");
//knex PostgreSQL client
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user: settings.user,
    password : settings.password,
    database : settings.database,
  }
});


const printName = (err, results) => {
  if (!results) {
    console.log("no results")
    return
  }
  results.forEach((row, index) => {
        let birthdate = row.birthdate.toDateString();
        console.log(`- ${index + 1} ${row.first_name} ${row.last_name}, born '${birthdate}'`)
  });
};

//callback
const firstName = (first_name, callback) => {
   knex.select().from('famous_people').where('first_name', first_name).asCallback(callback);
}

const lastName = (last_name, callback) => {
   knex.select().from('famous_people').where('last_name', last_name).asCallback(callback);
}

const birthdate = (birthdate, callback) => {
   knex.select().from('famous_people').where('birthdate', birthdate).asCallback(callback);
}

firstName(process.argv[2], (err, res) => {
  printName(err, res);
  lastName(process.argv[2],  (err, res) => {
    printName(err,res);
    birthdate(process.argv[2], (err, res) => {
      printName(err,res);
      knex.destroy();
    });
  });
});





// knex.select('name').from('users')
//   .where('id', '>', 20)
//   .andWhere('id', '<', 200)
//   .limit(10)
//   .offset(x)
//   .asCallback(function(err, rows) {
//     if (err) return console.error(err);
//     knex.select('id').from('nicknames')
//       .whereIn('nickname', _.pluck(rows, 'name'))
//       .asCallback(function(err, rows) {
//         if (err) return console.error(err);
//         console.log(rows);
//       });
//   });