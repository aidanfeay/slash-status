# slash-status
A slash command Slack integration for advanced user statuses
## basic usage
To use, simply clone this repository and modify the `postURL` in `database.js` to link your local instance to a specific slack group. Then, initialize a postgres instance and run `node app.js`.
## detailed usage
1. Clone this repo
2. `npm install`
3. [Initialize a postgres instance](https://serversforhackers.com/using-postgresql)
4. In Slack, [create a new slash command](http://slack.com/services/new/slash-commands) and link to your server.
5. In Slack, [create a new incoming WebHook](http://slack.com/services/new/incoming-webhook) and modify the `postURL` in `database.js` to use your own webhook URL.
6. Modify `defaultChan` in `statusbot.js` to your own default channel.
7. Launch the application! (`node app.js`)

## prolonged usage
The above instructions only run a local instance of the bot. For prolonged usage, an external server (like [Heroku](http://heroku.com)) is advised.
