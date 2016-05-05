"use strict";
var mongoose = require('mongoose');
var User = require('../data/users');
var _ = require('underscore');

var router = require('express').Router();
router.route('/saveProfile').get(getUserInformation).post(addUser);//.delete(deleteSchool);

function getUserInformation(req, res) {
  console.log(req.body);
  console.log('user info');
  res.send(req.body)
  /*
    User.find(function (err, user) {
      console.log(user);
        if (err)
            res.send(err);
        else
            res.json(user);
    });*/
}

function addUser(req, res) {
  console.log(req.body);
  console.log('adduser');

  //hämta all statistik och skcika tillbaka
  /*Promise.all([getAPI.twitter(name),
                getAPI.spotify(name),
                getAPI.tumblr(name)]).then(function(data){
                  res.send(JSON.stringify(data));
    });*/
    let userInfo = req.body;
    var user = new User(_.extend({}, {
      user_id: userInfo.user_id,
      nickname: userInfo.nickname,
      last_save: new Date()
    }
    ));
    user.save(function (err) {
        if (err)
            res.send(err);
        else
        console.log(user);
            res.send(user);
    });

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
