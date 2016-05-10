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
      resolve(user);
    });
  });
}

function addUser(req, res) {

  //hämta all statistik och skcika tillbaka

    console.log('start');
    getSavedUser(req.body.user_id).then(
      function(savedUser){
      if(savedUser != undefined){
        console.log('finns sparad användare');
        //hämta statistik och skriv över
        console.log(savedUser);
        getAllStatistics(savedUser.identities[0].access_token, savedUser.mediaOverTime, savedUser.followed_byOverTime);
        /*statisticsController.mediaAndFollowedBy(savedUser.identities[0].access_token, savedUser.mediaOverTime, savedUser.followed_byOverTime).then(
          function(val){
            console.log(val);
          }
        )*/

        //Uppdatera existerande användare

        //Spara existerande användare
        /*user.save(function (err) {
            if (err)
                res.send(err);
            else
            console.log(user);
                res.send(user);
        });*/

      }else{
        //hämta statistik och spara ny user
        console.log('finns ingen saved user');
        /*statisticsController.mediaAndFollowedBy(req.body.identities[0].access_token, [], []).then(
          function(val){
            console.log(val);
          }
        )*/
        getAllStatistics(req.body.identities[0].access_token, [], [])
        .then(function(data){
          console.log(data[0].media);
            //res.send(JSON.stringify(data));
            //Skapa ny användare
            var user = new User(_.extend({}, {
              user_id: req.body.profile.user_id,
              nickname: req.body.profile.nickname,
              last_save: new Date(),
              mediaOverTime: [],
              followed_byOverTime: [],
              access_token: req.body.identities[0].access_token
            }));
            //Spara ny användare
            /*user.save(function (err) {
                if (err)
                    res.send(err);
                else
                console.log(user);
                    res.send(user);
            });*/
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
