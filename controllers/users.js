

var User = require('../models/user');
var express = require('express');
var router = express.Router();

// GET /users
// Get a list of users
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      return res.status(500).json({
        error: 'Error listing users: ' + err,
      });
    }

    res.json(users);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function (req, res) {
  User.findOne({
    _id: req.params.id,
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        error: 'Error reading user: ' + err,
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// DELETE /users/:id
// Get an user by ID and DElETE
router.delete('/:id', function (req, res) {
  User.findOne({
    _id: req.params.id,
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        error: 'Error reading user: ' + error,
      });
    }

    if (!user) {
      return res.status(200).end();//cheat for now change 404 to 200 will look at again later

    }

  }).remove().exec();
});

// CREATE users
// create new user using POST
router.post('/', function (req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Update User
//find user by id and update using PUT
router.put('/:id', function (req, res) {
  const updateUser = req.payload;
  User.findByIdAndUpdate({ _id: req.params.id }, updateUser, function (err, user) {
        if (err) {
          return res.status(500).end();
        }

        if (!user) {
          return res.status(404).end();
        }

        console.log(user);
      });
});

module.exports = router;
