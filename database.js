var pg = require('pg');
var request = require('request');
var conString = process.env.DATABASE_URL;
var postURL = 'https://hooks.slack.com/services/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';
var error = function(err){
  if(err) {
    return console.error('error!', err);
  }
}

module.exports = {
  createTable: function(){
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query('CREATE TABLE IF NOT EXISTS status(user_name text, user_id text, user_status text, timestamp text, prefchan text)', function(err, result) {
        done();
        error(err);
      });
    });
  },
  addRow: function(user_name, user_id, user_status, timestamp, prefchan){
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query("INSERT INTO status (user_name, user_id, user_status, timestamp, prefchan) SELECT '"+user_name+"','"+user_id+"','"+user_status+"','"+timestamp+"','"+prefchan+"' WHERE NOT EXISTS ( SELECT 1 FROM status WHERE user_id = '"+user_id+"' )", function(err, result) {
        done();
        error(err);
      });
    });
  },
  setStatus: function(res, user_name, user_status, timestamp){
    var output;
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query("UPDATE status SET user_status = '"+user_status+"', timestamp = '"+timestamp+"' WHERE user_name = '"+user_name+"'", function(err, result) {
        done();
        return res.status(200).send("Status set: " + user_status);
        error(err);
      });
      client.query("SELECT * FROM status WHERE user_name = '"+user_name+"'", function(err, result) {
        done();
        if (result.rows[0]) {
          request.post(postURL, { json: { text: "<" + result.rows[0].user_id + "|" + user_name + ">: " + user_status, channel: result.rows[0].prefchan}});
        } else {
          return res.status(200).send("Status for " + user_name + " has not been set.");
        }
        error(err);
      });
    });
  },
  getStatus: function(res, user_name, timestamp){
    var output;
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query("SELECT * FROM status WHERE user_name = '"+user_name+"'", function(err, result) {
        done();
        if (result.rows[0]) {
          return res.status(200).send("Status for " + user_name + ": " + result.rows[0].user_status);
        } else {
          return res.status(200).send("Status for " + user_name + " has not been set.");
        }
        error(err);
      });
    });
  },
  setChannel: function(res, user_name, defaultChan){
    var output;
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query("UPDATE status SET prefchan = '"+defaultChan+"' WHERE user_name = '"+user_name+"'", function(err, result) {
        done();
        return res.status(200).send("Default channel for " + user_name + ": " + defaultChan);
        error(err);
      });
    });
  }
}