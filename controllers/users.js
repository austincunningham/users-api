

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

// DELETE /users/delete/:id
// Get an user by ID and DElETE
router.delete('/:id', function (req, res) {
  User.findOne({
    _id: req.params.id,
  }, function (error, user) {
    if (error) {
      return res.status(500).json({
        error: 'Error reading user: ' + error,
      });
    }

    if (!user) {
      return res.status(404).end();

    }

  }).remove();
});

module.exports = router;
