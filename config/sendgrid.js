var sendgrid = require('sendgrid'),
    nconf  = require('nconf');

var api_user  =    process.env.SENDGRID_USER || nconf.get('sendgrid:api_user');
var api_password = process.env.SENDGRID_PASSWORD || nconf.get('sendgrid:api_password');

module.exports.sendgrid = sendgrid(api_user, api_password);
