const express = require('express');
const router = express.Router();

const FundCtrl = require('../controllers/funds-ctrl')

/**
 * POST /funds
 * BODY: {userAddr, projAddr, funding, etc...}
 * funds a certain project
 * returns the current funding status of the project if successful
 */
router.post('/', function (req, res, next) {
  // TODO
  new FundCtrl().doFund({
    userAddr: req.body.userAddr,
    projAddr: req.body.projAddr,
    funding: req.body.funding
  }, (err, result) => {
    if (err) return next(err);
    res.send(result)
  })
});

module.exports = router;
