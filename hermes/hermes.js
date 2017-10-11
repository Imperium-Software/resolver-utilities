const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.post('/', function(req, res) {
    let cnf = req.body.cnf;
    res.send('Hello');
});

app.get('/', function(req, res) {
    res.send('Please use POST to talk to me.')
})

app.listen(8080, function() {
    console.log('Endpoint is exposed on port 8080.')
});
