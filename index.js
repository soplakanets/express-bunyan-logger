var uuid = require('node-uuid');


module.exports.childLogger = function(loggerInstance) {
  if (!loggerInstance) {
    loggerInstance = require('bunyan').createLogger();
  }

  return function(req, res, next) {
    reqId = uuid.v1();
    reqLogger = loggerInstance.child({req_id: reqId});
    req.log = reqLogger;
    next()
  }
}
