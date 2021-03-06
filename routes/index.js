var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res) {
    res.render('signin', { title: 'Express' });
});

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirecct: '/login'
})
);

router.post('/local-reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirecct: '/login'
})
);

router.get('/logout', function (req, res) {
    var name = req.user.username;
    console.log('loggin out:', name);
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully logged out " + name + "!";
});


router.get('/helloworld', function (req, res) {
    res.render('helloworld', { title: "Hello, World!" });
});

router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.collection('userCollection');
    collection.find({}).toArray(function (e,doc)
    {
        res.render('userlist', { users: doc });
    });
});


router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'New User'});
});

router.post('/adduser', function (req, res) {
    var db = req.db;
    var username = req.body.username;
    var useremail = req.body.useremail;
    var collection = db.collection('userCollection');
    collection.insert({ username: username, email: useremail }, function (e, doc) {
        if (e) {
            res.send("there was a problem adding the user.");
        }
        else {
            res.location("userlist");
            res.redirect("userlist");
        }
    });
});
module.exports = router;
