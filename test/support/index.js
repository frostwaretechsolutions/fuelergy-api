
/* Testing Libraries */
global.chai   = require('chai');
global.expect = chai.expect;
global.mocky  = require('sinon');
global.nock   = require('nock');
global._      = require('lodash');


/* Doubles */
global.req = require('./mockReq');
global.res = require('./mockRes');

/* Controllers */
global.ApplicationController = require('../../api/controllers/ApplicationController');
global.UserController        = require('../../api/controllers/UserController');

/* Models */
global.User = _.assign(require('../../api/models/User'), require('./waterlineModel'));




/* Policies */

/* Services */
global.FindStations  = require('../../api/services/FindStations');
global.UpdateStation = require('../../api/services/UpdateStation');
global.UserUpdate    = require('../../api/services/UserUpdate');
global.UserLogin     = require('../../api/services/UserLogin');
global.CreateError   = require('../../api/services/CreateError');

