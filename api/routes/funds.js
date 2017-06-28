const express = require('express');
const router = express.Router();

/**
 * POST /funds
 * BODY: {userAddr, projAddr, funding, etc...}
 * funds a certain project
 * returns the current funding status of the project if successful
 */
router.post('/', function(req, res, next) {
  // TODO
});

module.exports = router;
