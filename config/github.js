var Github = require('github'),
    nconf  = require('nconf');

var github = new Github({
  version: '3.0.0',
  debug: true,
  protocol: 'https',
  timeout: 5000,
  headers: {
    "user-agent": "Fuelergy"
  }
});

var credentials = process.env.GITHUB || nconf.get('github');

github.authenticate(credentials);

module.exports.github = github;
