var database = require('./database');

module.exports = function (req, res, next) {
  var user_id = req.body.user_id;
  var user_name = req.body.user_name;
  var text = req.body.text;
  var timestamp = new Date().toLocaleString('en-US', {timeZone: "America/New_York"});
  var defaultChan = process.env.DEFAULT_CHAN;

  if (text == '') {
    return res.status(200).send('Please enter a status or a @username');
  } else if (text[0] == '@') {
    database.getStatus(res, text.substr(1,text.length));
  } else if (text[0] == '#') {
    database.setChannel(res, user_name, text);
  } else {
    database.addRow(user_name, user_id, text, timestamp, defaultChan);
    database.setStatus(res, user_name, text, timestamp);
  }
}
