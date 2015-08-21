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
    console.log('createTable');
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query('CREATE TABLE IF NOT EXISTS status(user_name text, user_id text, user_status text, timestamp text, prefchan text)', function(err, result) {
        done();
        error(err);
      });
    });
  },
  addRow: function(user_name, user_id, user_status, timestamp, prefchan){
    console.log('addRow');
    console.log(user_name + " : " + user_id + " : " + user_status + " : " + timestamp + " : " + prefchan);
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query("INSERT INTO status (user_name, user_id, user_status, timestamp, prefchan) SELECT '"+user_name+"','"+user_id+"','"+user_status+"','"+timestamp+"','"+prefchan+"' WHERE NOT EXISTS ( SELECT 1 FROM status WHERE user_id = '"+user_id+"' )", function(err, result) {
        done();
        error(err);
      });
    });
  },
  setStatus: function(res, user_name, user_status, timestamp){
    console.log('setStatus');
    var output;
    pg.connect(conString, function(err, client, done) {
      error(err);
      client.query("UPDATE status SET user_status = '"+user_status+"', timestamp = '"+timestamp+"' WHERE user_name = '"+user_name+"'", function(err, result) {
        done();
        request.post(postURL, { json: { text: user_name + ": " + user_status}});
        return res.status(200).send("Status set: " + user_status);
        error(err);
      });
    });
  },
  getStatus: function(res, user_name, timestamp){
    console.log('getStatus');
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
  }
}