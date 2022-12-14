'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.App = void 0;
var Express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config_1 = require('../config');
var App = /** @class */ (function () {
  function App() {
    this.applicationConfig = new config_1.ApplicationConfig();
    this.config = this.applicationConfig.getAllApplicationConfig();
  }
  // to make singleton class we should define static method to get instance or instantiate class
  App.getInstance = function () {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  };
  App.prototype.start = function () {
    return __awaiter(this, void 0, void 0, function () {
      var port_1, corsOptions, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 1, , 3]);
            port_1 = this.config.application.express.port;
            corsOptions = {
              origin: '*',
              methods: 'GET,PUT,POST,DELETE,OPTIONS',
              allowedHeaders: ['Content-Type', 'Authorization', 'Lang'],
              preflightContinue: false,
              optionsSuccessStatus: 204
            };
            this.express = Express();
            this.express.use(bodyParser.json({ limit: '50mb' }));
            this.express.use(cors(corsOptions));
            this.server = this.express.listen(port_1, function () {
              console.log('[App]: Listening on port '.concat(port_1));
            });
            return [3 /*break*/, 3];
          case 1:
            error_1 = _a.sent();
            return [4 /*yield*/, this.shutDown(error_1)];
          case 2:
            _a.sent();
            throw error_1;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  App.prototype.shutDown = function (err) {
    this.server.close(function () {
      console.error(err);
      process.exit(1);
    });
  };
  return App;
})();
exports.App = App;
