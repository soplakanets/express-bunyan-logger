var uuid    = require('node-uuid');
var bunyan  = require('bunyan');


module.exports = function(loggerInstance) {
  if (!loggerInstance) {
    var opts = {
      stream: process.stdout,
      serializers: {
        req: bunyan.stdSerializers.req
      }
    };
    loggerInstance = bunyan.createLogger(opts);
  }

  return {
    childLogger: function(req, res, next) {
      var reqId = uuid.v1();
      req.log = loggerInstance.child({req_id: reqId});
      next();
    },
    requestLogger: function(req, res, next) {
      req.log.info({req: req}, 'HTTP');
      next();
    }
  }
};
