var redis = require('redis');
var url = require('url');
var redisURL = url.parse(process.env.REDIS_URL);
var client = redis.createClient(redisURL.port, redisURL.hostname);
client.auth(redisURL.auth.split(":")[1]);

var request = require('request');
var postUrl = process.env.POST_URL;

var defaultChan = process.env.DEFAULT_CHAN;

client.on("error", function (err) {
  console.log("Error " + err);
});

Database = {
  alertStatus: function(user_name, user_status, channel) {
    request.post(postURL, { json: { text: "*" + user_name + ":* " + user_status, channel: channel}});
  },
  setStatus: function(res, user_name, user_status, timestamp){
    console.log({"user":  user_name,
      "status": user_status,
      "timestamp": timestamp
    });

    client.hmset("user:" + user_name, {
      status: user_status,
      timestamp: timestamp
    }, function (err, replies) {
      client.hexists("user:" + user_name, "pref_chan", function(err,rep) {
        if(rep === 1) {
          client.hget("user:" + user_name, "pref_chan", function(err, rep) {
            Database.alertStatus(user_name, user_status, rep);
          });
        }
        else {
          Database.alertStatus(user_name, user_status, defaultChan);
        }
      });

      return res.status(200).send("Status set: " + user_status);
    });
  },
  getStatus: function(res, user_name, timestamp){
    client.hmget("user:" + user_name, "status", "timestamp", function(err, replies) {
      console.log(replies);
    });
  },
  setChannel: function(res, user_name, channel){
    client.hset("user:" + user_name, "pref_chan", channel);
  }
}

module.exports = Database;
