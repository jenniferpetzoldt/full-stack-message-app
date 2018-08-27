//Requirements
const express = require('express');
const app = express ();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const pg = require('pg');
const Pool = pg.Pool;
const config = {
  database: 'message_board', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};
//configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static files
app.use(express.static('server/public'));

const pool = new Pool(config);

pool.on('connect', (client) => {
  console.log('pg connected');
})

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle pg client', err);
  process.exit(-1);
});

module.exports = pool;


//start the server
app.listen(PORT, ()=>{
    console.log(`App is running on port: ${PORT}`);
});
