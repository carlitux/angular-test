import express from 'express';
import glob from 'glob';

import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import nunjucks from 'nunjucks';
import nconf from 'nconf';
import validator from 'express-validator';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import mailer from 'express-mailer';
import mg from 'nodemailer-mailgun-transport';

module.exports = function(app, db) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', nconf.get('root') + '/app/views');
  app.set('view engine', 'nunjucks');
  nunjucks.configure(nconf.get('root') + '/app/views', {
      autoescape: true,
      express: app
  });


  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(validator());
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(nconf.get('root') + '/public'));
  app.use(methodOverride());

  app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });

  var controllers = glob.sync(nconf.get('root') + '/app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
