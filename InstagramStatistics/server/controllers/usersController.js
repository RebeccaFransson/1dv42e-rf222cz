var mongoose = require('mongoose');
var User = require('../data/users');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:nickname?').get(getUserInformation).post(addUser);//.delete(deleteSchool);

function getUserInformation(req, res) {
    User.find(function (err, user) {
      console.log(user);
        if (err)
            res.send(err);
        else
            res.json(user);
    });
}

function addUser(req, res) {
  console.log(req.body);
  console.log('adduser');
  /*
    var user = new User(_.extend({}, req.body));
    user.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json(school);
    });
    */
}

//update userinformation
function deleteSchool(req, res) {
    var id = req.params.id;
    School.remove({ _id: id }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

module.exports = router;
