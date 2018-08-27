const express = require('express');
const router = express.Router();

//PG setup
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'message_board',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
}

const pool = new Pool(config);

// If postgres connects successfully
pool.on('connect', () => {
    console.log('postgresql connected');
});

// If postgres connection fails
pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});

//route to pull all messages from database
router.get('/', function(req, res){
    console.log('in GET route');
    const query = `SELECT * FROM "messages";`;
    pool.query(query).then((results)=>{
        console.log(results);
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error in GET', error);
        res.sendStatus(500);
    });
});

//route to add messaged and commenter's name to database
router.post('/', function(req, res){
    const messageToAdd = req.body;
    console.log('In POST route:', messageToAdd);
    const query = `INSERT INTO "messages" ("name", "message") VALUES ($1, $2);`;
    pool.query(query, [messageToAdd.name, messageToAdd.message]).then(()=>{
res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error in POST', error);
        res.sendStatus(500);
    });
});

// Exports module
module.exports = router;