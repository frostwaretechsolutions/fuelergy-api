/**
 * Default jobs configuration
 * (sails.config.jobs)
 *
 * For more information using jobs in your app, check out:
 * https://github.com/vbuzzano/sails-hook-jobs
 */
var nconf = require('nconf');

module.exports.jobs = {

  // Where are jobs files
  "jobsDirectory": "api/jobs",

  // agenda configuration. 
  // for more details about configuration,
  // check https://github.com/rschmukler/agenda
  "db": { 
    "address"    : process.env.MONGOLAB_URI || nconf.get('mongo:url'),
    "collection" : "agendaJobs" 
  },
  "name": "fuelergy process",
  "processEvery": "10 seconds",
  "maxConcurrency": 20,
  "defaultConcurrency": 5,
  "defaultLockLifetime": 10000
};
