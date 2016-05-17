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
      if (err) {
        reject(err)
      }
      resolve(user);
    });
    /*User.find(function(err, data){
      console.log(data);
    })*/
  });
}

function addUser(req, res) {

  //hämta all statistik och skcika tillbaka

    console.log('start');
    getSavedUser(req.body.user_id).then(
      function(savedUser){
      if(savedUser != null){
        console.log('finns sparad användare');
        //hämta statistik och skriv över

        getAllStatistics(savedUser.access_token, savedUser.counts.mediaOverTime, savedUser.counts.followed_byOverTime, savedUser.counts.followsOverTime)
        .then(function(data){
        //Uppdatera existerande användare
          var update = _.extend(data[0], data[1].topTwelve, {last_save: new Date()});
          savedUser.update({_id: savedUser._id}, {$set: update}, function (err, numAffected) {
              if (err)
                  res.send(err);
              else
                  res.send(savedUser);
          });
          console.log(savedUser);
        });
      }else{
        //hämta statistik och spara ny user
        console.log('finns ingen saved user');
        getAllStatistics(req.body.identities[0].access_token, [], [], [])
        .then(function(data){
          console.log(data);
          //Skapa ny användare
          var user = new User(_.extend({}, {
            user_id: req.body.user_id,
            nickname: req.body.nickname,
            profile_picture: req.body.profile_picture,
            last_save: new Date(),
            counts: {
              mediaOverTime: data[0].media,
              followed_byOverTime: data[0].followed_by,
              followsOverTime: data[0].follows
            },
            topTwelve: data[1].topTwelve,
            access_token: req.body.identities[0].access_token
          }));
          //Spara ny användare
          user.save(function (err) {
              if (err){
                  res.send(err);
              }else{
                  res.send(user);
              }
          });
          });

      }
    });//then


}
function getAllStatistics(access_token, media, followed, follows){
  return Promise.all([statisticsController.mediaAndFollowedBy(access_token, media, followed, follows),
                      statisticsController.getTwelveMostLikedPictures(access_token)])
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
