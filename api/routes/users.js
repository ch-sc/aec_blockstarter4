const express = require('express')
const router = express.Router()

const ProjectCtrl = require('../controllers/project-ctrl')
const UserCtrl = require('../controllers/user-ctrl')


/**
 * GET /users/
 * returns all users of the blockchain
 */
router.get('/', function(req, res, next) {
  new UserCtrl().get({}, (err, result) => {
    if (err) return next(err)
    res.send(result)
  })
});


/**
 * GET /users/{addr}/projects
 * lists all the proejcts that a user owns
 */
router.get('/:addr/projects', function(req, res, next) {
  new ProjectCtrl().get({
    creator: req.params.addr
  }, (err, result) => {
    if (err) return next(err)
    res.send(result)
  })
});


/**
 * POST /users/{addr}/projects
 * BODY: {title, description, etc...}
 * creates a project for a ceratain user
 * returns project if successful
 */
router.post('/:addr/projects', function(req, res, next) {
  new ProjectCtrl().create({
    from: req.params.addr,
    title: req.body.title,
    description: req.body.description,
    fundingGoal: req.body.fundingGoal,
    fundingEnd: req.body.fundingEnd
  }, (err, result) => {
    if (err) return next(err);
    res.send(result)
  })
});



/**
 * DELETE /users/{userAddr}/project/{projAddr}
 * removes the project and sends all the fundings back to each backer
 * returns true
 */
router.delete('/:userAddr/project/:projAddr', function(req, res, next) {
  new ProjectCtrl().delete({
    projAddr: req.params.projAddr,
    userAddr: req.params.userAddr
  }, (err, result) => {
    if (err) return next(err);
    res.send(result)    
  })
});



/**
 * GET /users/{addr}/funds
 * list all the projects that I already backed/funded
 */
router.get('/:addr/funds', function(req, res) {
  // TODO
});

module.exports = router;
