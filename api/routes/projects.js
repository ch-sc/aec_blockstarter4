const express = require('express');
const router = express.Router();

const ProjectCtrl = require('../controllers/project-ctrl')


/**
 * GET /projects
 * returns all projects
 */
router.get('/', function(req, res, next) {
  new ProjectCtrl().get({}, (err, result) => {
    if (err) return next(err)
    res.send(result)
  })
});

module.exports = router;
