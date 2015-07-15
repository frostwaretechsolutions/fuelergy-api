
/* Testing Libraries */
global.chai   = require('chai');
global.expect = chai.expect;
global.mocky  = require('sinon');
global.nock   = require('nock');


/* Doubles */
global.req = require('./mockReq');
global.res = require('./mockRes');

/* Controllers */
global.ApplicationController = require('../../api/controllers/ApplicationController');
global.UserController        = require('../../api/controllers/UserController');

/* Models */
global.User = require('../../api/models/User');

/* Policies */

/* Services */
global.FindStations  = require('../../api/services/FindStations');
global.UpdateStation = require('../../api/services/UpdateStation');

