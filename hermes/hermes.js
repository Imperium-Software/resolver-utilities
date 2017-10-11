const HOST = 'localhost';
const PORT = 55555;

const express = require('express');
const bodyParser = require('body-parser');
const net = require('net');

const app = express();
var client = new net.Socket();

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/', function (req, res) {

    // Check for presence of cnf parameter.
    
    let cnf = req.body.cnf;
    if (cnf === undefined) {
        res.send('You are going to need to send me a CNF problem to pass to Zeus.');
        console.log('Received malformed request.');
        return;
    }
    console.log("Received the following job:");
    console.log(cnf);
    console.log("Attempting to send job to SATServer...");

    // Talk to SATServer.

    // construct request
    // write to socket.

    

    // Respond to browser.
    res.send("Your solution is:\n[some bit string]");
});

app.get('/', function (req, res) {
    res.send('Please use POST to talk to me.');
});

app.listen(8080, function () {
    console.log('Endpoint is exposed on port 8080.');
});

client.connect(PORT, HOST, function () {
    console.log('Connected to SATServer at (' + HOST + ':' + PORT + ")");

});

client.on('close', function() {
    console.log('Connection to SATServer closed.');
});