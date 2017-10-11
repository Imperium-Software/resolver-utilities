const HOST = 'localhost';
const PORT_INTERNAL = 55555;
const PORT_EXTERNAL = process.env.PORT || 3000;


const express = require('express');
const bodyParser = require('body-parser');
const net = require('net');

const app = express();
var client = new net.Socket();
var return_data = undefined;

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

client.connect(PORT_INTERNAL, HOST, function () {
    console.log('Connected to SATServer at (' + HOST + ':' + PORT_INTERNAL + ")");
});

client.on('data', function(data) {
    return_data = data;
});

client.on('close', function() {
    console.log('Connection to SATServer closed.');
});

function construct_request(cnf) {
    var request = {
        "SOLVE": {
            "raw_input": cnf,
            "tabu_list_length": 10,
            "max_false": 5,
            "rec": 5,
            "k": 5
        }
    };
    return JSON.stringify(request) + '#';
}

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

    client.write(construct_request(cnf));
    while (return_data === undefined) {
        sleep(500);
    
    }
    // Respond to browser.
    res.send("Server response : " + return_data);
});

app.get('/', function (req, res) {
    res.send('Please use POST to talk to me.');
});

app.listen(PORT_EXTERNAL, function () {
    console.log(`Endpoint is exposed on port ${PORT_EXTERNAL}.`);
});
