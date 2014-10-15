var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoskin = require('mongoskin');
var session = require("express-session");
var passport = require("passport");
var localStrategy = require("passport-local");
var googleStrategy = require("passport-google");
var twitterStrategy = require("passport-twitter");
var facebookStrategy = require("passport-facebook");


var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();

mongoose.connect('mongodb://localhost:27017/meandb');
var db = mongoose.connection;
var dbrest = mongoskin.db('mongodb://localhost:27017/meandb2', { native_parser: true });;

db.on('error', function (err) {
    console.log('error', err);
});

db.on('open', function () {
    console.log('connection open');
});

dbrest.on('open', function () {
    console.log('connection open-dbrest');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'meanapp' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){

    console.log(req.session);
    var error = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.notice;
    delete req.session.success;

    if (error) res.locals.error = error;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();

});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    req.db = db;
    req.dbrest = dbrest;
    next();
});

app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
