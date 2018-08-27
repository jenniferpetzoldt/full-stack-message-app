//Requirements
const express = require('express');
const app = express ();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const messagesRouter = require('./routers/messages.router.js')

//configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static files
app.use(express.static('server/public'));

app.use('/messages', messagesRouter);



//start the server
app.listen(PORT, ()=>{
    console.log(`App is running on port: ${PORT}`);
});
