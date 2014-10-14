var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.get('/userlist', function (req, res) {
    var db = req.dbrest;
    var collection = db.collection('userlist');
    collection.find().toArray(function (e, doc) {
        res.json(doc);
    });
});

module.exports = router;
