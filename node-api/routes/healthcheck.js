const router = require('express').Router();

router.get("/", function(req, res, next) {
  res.end();
});

module.exports = router;
