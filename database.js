var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDIS_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname);
client.auth(redisURL.auth.split(":")[1]);

var request = require('request');
var postUrl = process.env.POST_URL;

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = {
  addRow: function(user_name, user_id, user_status, timestamp, pref_chan){
    client.hmset("user:" + user_name, "id", user_id, "status", user_status, "pref_chan", pref_chan, "timestamp", timestamp);
  },
  setStatus: function(res, user_name, user_status, timestamp){
    client.hmset("user:" + user_name, "status", user_status, "timestamp", timestamp, function (err, replies) {
      return res.status(200).send("Status set: " + user_status);
    });
  },
  getStatus: function(res, user_name, timestamp){
    client.hmget("user:" + user_name, "status", "timestamp", function(err, replies) {
      console.log(replies);
    });
  },
  setChannel: function(res, user_name, defaultChan){
    client.hset("user:" + user_name, "pref_chan", defaultChan);
  }
}
