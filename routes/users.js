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

router.post('/adduser', function (req, res) {
    var db = req.dbrest;
    db.collection('userlist').insert(req.body,function (e, doc) {
        res.send((e === null) ? { msg: '' } : { msg: e });
    });
});

router.delete('/deleteuser/:userid', function (req, res) {
    var db = req.dbrest;
    db.collection('userlist').removeById(req.params.userid, function (e, result) {
        res.send((result === 1) ? { msg: '' } : { msg: e });
    });
});

module.exports = router;
