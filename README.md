Slash / Status
==============

A [Slack](https://slack.com) integration that allows users to store their temporary whereabouts and allows other users to retrieve those statuses on demand. It posts to designated channels as well, providing a live feed of where people are throughout the day. It's essentially the away message that Slack is missing.

## Commands

* `/<slashcommand> <status>`: Set your status (e.g. `/<slashcommand> leaving for an offsite meeting` or `/<slashcommand> at the dentist, be back at 3.`) Don't forget to change your status “back at desk” (or BAD) after returning!
* `/<slashcommand> @<username>`: Recall a user's most recent status.
* `/<slashcommand> #<channel>`: Change your default output channel.

## Basic usage

To get started, simply clone/fork this repository and modify the `postURL` in `database.js` to link your local instance to a specific slack group. Then, initialize a postgres instance and run `node app.js`.

## Installation / Config

You will need to install Redis, and have npm locally. This is built to be run off of Heroku, but can be run locally using the `heroku local` command.

* In Slack, [create a new slash command](http://slack.com/services/new/slash-commands) and link it to your server.
* In Slack, [create a new incoming WebHook](http://slack.com/services/new/incoming-webhook), and within Heroku set the config for `POST_URL` to be the endpoint URL.
* On Heroku, set config for `POST_URL` to be the webhook url, and `DEFAULT_CHAN` to be the default channel you wish to use.
* Launch the app within Heroku!

## Local use

Because Slack requires an endpoint, this is built to be used in Heroku. If you want to run it locally, ensure you have Redis installed. Changes any variables within `.env`, then run `heroku local`. This will ensure you have the right variables from `.env` loaded.

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
