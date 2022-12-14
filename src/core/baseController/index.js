'use strict';
exports.__esModule = true;
exports.BaseController = void 0;
var BaseController = /** @class */ (function () {
  function BaseController() {}
  BaseController.jsonResponse = function (res, code, message) {
    return res.status(code).json({ message: message });
  };
  BaseController.prototype.ok = function (res, dto) {
    if (!dto) {
      return res.sendStatus(200);
    }
    return res.status(200).json(dto);
  };
  BaseController.prototype.clientError = function (res, message) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Bad Request');
  };
  BaseController.prototype.unAuthorized = function (res, message) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  };
  BaseController.prototype.forbidden = function (res, message) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Access denied');
  };
  BaseController.prototype.notFound = function (res, message) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  };
  BaseController.prototype.fail = function (res, message) {
    return BaseController.jsonResponse(res, 500, message ? message : 'Internal Server Error');
  };
  return BaseController;
})();
exports.BaseController = BaseController;
