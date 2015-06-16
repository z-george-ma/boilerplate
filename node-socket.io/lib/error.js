var path = require('path');
var entryPath = path.dirname(process.mainModule.filename);

var NotFound = function(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
};

module.exports = function(app) {
  app.get("/*", function(req, res, next) {
    throw new NotFound();
  });
  
  app.use(function(err, req, res, next){
      if (err instanceof NotFound) {
          res.status(404).sendFile("website/404.html", { root: entryPath });
      } else {
          res.status(500).json(err);
      }
  });
};
