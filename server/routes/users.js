var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = {
    name: '大地瓜',
    age: 18,
    job: '学生'
  }
  // res.send(JSON.stringify(users))
  res.json(users)
});

module.exports = router;
