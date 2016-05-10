"use strict";
var mongoose = require('mongoose');
var User = require('../data/users');
var _ = require('underscore');
var statisticsController = require("./statisticsController");

var router = require('express').Router();
router.route('/saveProfile').get(getUserInformation).post(addUser);//.delete(deleteSchool);

function getUserInformation(req, res) {
      var id = req.params.id;
    User.find({ _id: id }, function (err, user) {
      console.log(user);
        if (err)
            res.send(err);
        else
            res.json(user);
    });
}
function getSavedUser(id) {
  return new Promise(function(resolve, reject){
    User.findOne({ user_id: id }, function (err, user) {
      console.log('error: ');
      console.log(err);
      console.log(user);
      resolve(user);
    });
  });
}

function addUser(req, res) {

  //hämta all statistik och skcika tillbaka
  /*Promise.all([getAPI.twitter(name),
                getAPI.spotify(name),
                getAPI.tumblr(name)]).then(function(data){
                  res.send(JSON.stringify(data));
    });*/
    //let allLikes = statisticsController.getAllLikes();
    console.log('start');
    getSavedUser(req.body.user_id).then(
      function(savedUser){
        console.log('inne i then');
        console.log(savedUser);
      if(savedUser != undefined){
        //hämta statistik och skriv över
        let mediaAndFollowedBy = statisticsController.mediaAndFollowedBy(savedUser.user_id, savedUser.mediaOverTime, savedUser.followed_byOverTime);
        console.log(mediaAndFollowedBy);
        var user = new User(_.extend({}, {
          user_id: req.body.profile.user_id,
          nickname: req.body.profile.nickname,
          last_save: new Date(),
          mediaOverTime: [],
          followed_byOverTime: []
        }
        ));
        /*user.save(function (err) {
            if (err)
                res.send(err);
            else
            console.log(user);
                res.send(user);
        });*/
      }else{
        //hämta statistik och spara ny user
        console.log('finns ingen saves user');
        let mediaAndFollowedBy = statisticsController.mediaAndFollowedBy(req.body.identities[0].access_token, [], []);
        console.log(mediaAndFollowedBy);
      }
    });//then


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
