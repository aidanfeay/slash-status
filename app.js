var express = require('express');
var bodyParser = require('body-parser');
var statusbot = require('./statusbot');
var database = require('./database');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) { res.status(200).send('bots!') });
app.post('/status', statusbot);
database.createTable();

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});

module.exports = app;