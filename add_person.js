
//knex PostgreSQL client
var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

//knex destroy
knex.destroy(firstName);


const printName = (err, results) => {
  //console.log(results.rows[0])
  results.rows.forEach((row, index) => {
        let birthdate = row.birthdate.toDateString();
        console.log(`- ${index + 1} ${row.first_name} ${row.last_name}, born '${birthdate}'`)
  });
  client.end()
};

//callback
const firstName = (first_name, callback) => {
   knex.select('first_name').from('famous_people').where('first_name=$1'), [first_name], callback
}
const firstName = (first_name, callback) =>

firstName(process.argv[2], printName);