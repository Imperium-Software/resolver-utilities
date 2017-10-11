const HOST = '127.0.0.1';
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
app.use(express.static('static'))

// Solving Stuff

function construct_request(cnf) {
    var request = {
        "SOLVE": {
            "raw_input": cnf["raw_input"],
            "tabu_list_length": 10,
            "max_false": 5,
            "rec": 5,
            "k": 5,
            "max_flip": 5,
            "population_size": 50, 
            "sub_population_size": 5,
        }
    };
    return JSON.stringify(request) + '#';
}

app.post('/solve', function (req, res) {

    client.connect(PORT_INTERNAL, HOST, function () {
        console.log('Connected to SATServer at (' + HOST + ':' + PORT_INTERNAL + ")");
        client.connected = true;
    });
    
    client.on('data', function(data) {
        return_data = data.slice(0, -1);
        console.log(return_data.toString('utf8'));
        // console.log()
        // res.send(return_data.toString('utf8'));
    });
    
    client.on('close', function() {
        console.log('Connection to SATServer closed.');
    });

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
    client.write(construct_request(cnf));
    res.send('awwww yis');
});

app.get('/solve', function (req, res) {
    res.send('Please use POST to talk to me.');
});

app.listen(PORT_EXTERNAL, function () {
    console.log(`Endpoint is exposed on port ${PORT_EXTERNAL}.`);
});
