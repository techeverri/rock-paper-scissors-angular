
var PORT = process.env.PORT || 8080;

// lowdb

var low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')

const db = low(adapter)

// express

var open = require("open");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get("/ping", function ping(req, res) {
  return res.send("pong")
})

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get("/moves", function (request, response) {
    db.read();
    response.send(db.get('moves').values());
});

app.get("/scores", function (request, response) {
    db.read();
    response.send(db.get('scores').values());
});

app.post("/scores", function (request, response) {
    var player = request.body.player;
    db.read();
    var score = db.get('scores').find({ player: player }).value();
    if (score) {
        var wins = score.wins | 0;
        db.get('scores')
            .find({ player: player })
            .assign({ wins: wins + 1 })
            .value();
    } else {
        db.get('scores')
            .push({ player: player, wins: 1 })
            .value();
    }
    db.write();
    response.sendStatus(200);
});

listener = app.listen(PORT, function () {
    var port = listener.address().port;
    open('http://localhost:' + port);
    console.log('Your app is listening on port ' + port);
});
