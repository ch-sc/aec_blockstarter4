const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const logger = require('./lib/logger');

const projects = require('./routes/projects');
const users = require('./routes/users');
const funds = require('./routes/funds');

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/projects', projects);
app.use('/users', users);
app.use('/funds', funds);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  const status = err.status || 500;
  logger.log(status >= 500 ? 'error' : 'warn', err);
  res.status(status);
  res.send(err);
});

app.listen(port, () => {
  logger.info('App listening on port %d', port)
})


// only to debug
const ProjectCtrl = require('./controllers/project-ctrl')
for (let i = 1; i <= 10; i++) {
  new ProjectCtrl().create(null, {
    title: `Test project ${i}`,
    description: `Test description ${i}`,
    fundingGoal: 1000000,
    fundingEnd: '2017-07-18T15:00:00'
  }, (err) => {
    if (err) return logger.error(err);
  })
}
