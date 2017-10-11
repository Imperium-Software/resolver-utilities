const express = require('express')
const app = express()

app.post('/', function(req, res) {
    res.send('Hello')
});

app.get('/', function(req, res) {
    res.send('Please use post to talk to me.')
})

app.listen(8080, function() {
    console.log('Endpoint is exposed on port 8080.')
});
