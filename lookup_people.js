const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect()


const printName = (err, results) => {
  //console.log(results.rows[0])
  results.rows.forEach((row, index) => {
        console.log(`- ${index + 1} ${row.first_name} ${row.last_name}, born '${row.birthdate}'`)
  });
  client.end()
};

//callback
const firstName = (first_name, callback) => {
  client.query(`SELECT * from famous_people where first_name=$1;`, [first_name], callback)
}

firstName(process.argv[2], printName);

// node lookup_people.js Paul
// Searching ...
// Found 2 person(s) by the name 'Paul':
// - 1: Paul Rudd, born '1969-04-06'
// - 2: Paul Giamatti, born '1967-06-06'