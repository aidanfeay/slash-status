# slash-status
A [Slack](https://slack.com) integration that allows users to store their temporary whereabouts and allows other users to retrieve those statuses on demand. It posts to designated channels as well, providing a live feed of where people are throughout the day. It's essentially the away message that Slack is missing.
## commands 
* `/<slashcommand> <status>`: Set your status (e.g. `/<slashcommand> leaving for an offsite meeting` or `/<slashcommand> at the dentist, be back at 3.`) Don't forget to change your status “back at desk” (or BAD) after returning!
* `/<slashcommand> @<username>`: Recall a user's most recent status.
* `/<slashcommand> #<channel>`: Change your default output channel.

## basic usage
To get started, simply clone/fork this repository and modify the `postURL` in `database.js` to link your local instance to a specific slack group. Then, initialize a postgres instance and run `node app.js`.
## detailed usage
1. Clone/fork this repo
2. `npm install`
3. [Initialize a postgres instance](https://serversforhackers.com/using-postgresql)
4. In Slack, [create a new slash command](http://slack.com/services/new/slash-commands) and link to your server.
5. In Slack, [create a new incoming WebHook](http://slack.com/services/new/incoming-webhook) and modify the `postURL` in `database.js` to use your own webhook URL.
6. Modify `defaultChan` in `statusbot.js` to your own default channel.
7. Launch the application! (`node app.js`)

## prolonged usage
The above instructions only run a local instance of the bot. For prolonged usage, an external server (like [Heroku](http://heroku.com)) is advised.

## BSD license
Copyright (c) 2015, Aidan Feay (@aidanfeay)

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
