var Slack = require('node-slack'),
    nconf  = require('nconf');

var hook_url  = process.env.SLACK_HOOK_URL || nconf.get('slack:hook_url');
var api_token = process.env.SLACK_API_TOKEN || nconf.get('slack:api_token');

module.exports.slack = new Slack(hook_url);
