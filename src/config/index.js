'use strict';
exports.__esModule = true;
exports.ApplicationConfig = void 0;
var dotenv = require('dotenv');
var ApplicationConfig = /** @class */ (function () {
  function ApplicationConfig() {
    dotenv.config();
  }
  ApplicationConfig.prototype.getAllApplicationConfig = function () {
    return {
      application: {
        jwt: {
          secret: process.env.JWT_SECRET || 'secret',
          lifeTime: Number(process.env.JWT_LIFETIME) || 3600
        },
        express: {
          host: process.env.APP_HOST,
          port: Number(process.env.APP_PORT) || 3000
        }
      },
      database: {
        type: 'jsonDatabase'
      }
    };
  };
  return ApplicationConfig;
})();
exports.ApplicationConfig = ApplicationConfig;
