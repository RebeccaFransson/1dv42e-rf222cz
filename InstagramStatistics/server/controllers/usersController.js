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
        //console.log(savedUser);
        getAllStatistics(savedUser.access_token, savedUser.mediaOverTime, savedUser.followed_byOverTime)
        .then(function(data){
          var update = _.extend(data[0], {last_save: new Date()});
          //Uppdatera existerande användare
          savedUser.update({_id: savedUser._id}, {$set: update}, function (err, numAffected) {
              if (err)
                  res.send(err);
              else
                  res.send(savedUser);
          });
        });
      }else{
        //hämta statistik och spara ny user
        console.log('finns ingen saved user');
        getAllStatistics(req.body.identities[0].access_token, [{count: 10, date: new Date()}], [])
        .then(function(data){
          //Skapa ny användare
          var user = new User(_.extend({}, {
            user_id: req.body.user_id,
            nickname: req.body.nickname,
            last_save: new Date(),
            mediaOverTime: data[0].media,
            followed_byOverTime: data[0].followed_by,
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
function getAllStatistics(access_token, media, followed){
  return Promise.all([statisticsController.mediaAndFollowedBy(access_token, media, followed)])
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
