"use strict";
var mongoose = require('mongoose');
var User = require('../data/users');
var _ = require('underscore');
var storage = require('node-persist');
var statisticsController = require("./statisticsController");

var router = require('express').Router();
router.route('/saveProfile').post(getSavedStats);//.delete(deleteSchool);

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
  });
}

function getSavedStats(req, res) {
  storage.initSync();
  //Kollar om användaren finns i databasen
  getSavedUser(req.body.user_id).then(
    function(savedUser){
      //storage.setItem('savedUserStorage', savedUser);
      if(savedUser != null){
        //TODO: kolla om saveduser är samma user som liggade in
        //Finns det redan sparad data? är den tillräckligt ny? använd den istället
        var savedTimestamp = new Date(storage.getItem('savedUserStorage').last_save).getTime() + 60000;//lägger till en minut - test
        var nowTime = new Date().getTime();

        //console.log('saved: '+new Date(savedTimestamp));
        //console.log('now: '+new Date(nowTime));
        //console.log('difference: '+(savedTimestamp - nowTime));
        if(savedTimestamp > nowTime){
          //Hämtar sparad statistik till redan sparad användare och skickar tillbaka till klienten.
          console.log('tar från storgare');
          console.log(savedUser);
          res.send(savedUser);
        }else{
          console.log('hämtar från api');
          //Hämtar ny statistik till redan sparad användare och skriver över.
          updateSavedUser(savedUser).then(function(user){
            res.send(user);
          })
        }
      }else{
        //Hämtar statistik till redan ny användare och sparar användaren.
        saveNewUser(req).then(function(user){
          res.send(user);
        })
      }
  });
}

function updateSavedUser(savedUser){
  return new Promise(function(resolve, reject){
    console.log(savedUser);
    getAllStatistics(savedUser.access_token, savedUser.counts.mediaOverTime, savedUser.counts.followed_byOverTime, savedUser.counts.followsOverTime)
    .then(function(data){

      //Uppdatera existerande användare
      //var update = _.extend({counts:data[0]}, {topTwelve:data[1].topTwelve}, {last_save: new Date()});
      //console.log(update);

      savedUser.counts = data[0];
      savedUser.topTwelve = data[1];
      savedUser.last_save = new Date();
      savedUser.save(function (err) {
          if (err)
              reject(err);
          else{
              storage.setItem('savedUserStorage', savedUser);
              resolve(savedUser);
          }
      });
      /*savedUser.update({_id: savedUser._id}, {$set: update}, { multi: true }, function (err, numAffected) {
        console.log(numAffected);
          if (err)
              reject(err);
          else{
            console.log(savedUser.last_save);
            storage.setItem('savedUserStorage', savedUser);
            resolve(savedUser);
          }
      });*/

    });
  });
}

function saveNewUser(req){
  return new Promise(function(resolve, reject){
    getAllStatistics(req.body.identities[0].access_token, [], [], [])
      .then(function(data){
        //Skapa ny användare
        var user = new User(_.extend({}, {
          user_id: req.body.user_id,
          nickname: req.body.nickname,
          profile_picture: req.body.profile_picture,
          last_save: new Date(),
          counts: {
            mediaOverTime: data[0].mediaOverTime,
            followed_byOverTime: data[0].followed_byOverTime,
            followsOverTime: data[0].followsOverTime
          },
          topTwelve: data[1],
          access_token: req.body.identities[0].access_token
        }));
        //Spara ny användare
        user.save(function (err) {
            if (err)
                reject(err);
            else{
                storage.setItem('savedUserStorage', user);
                resolve(user);
            }

        });
      });
    });
}

function getAllStatistics(access_token, media, followed, follows){
  return Promise.all([statisticsController.mediaAndFollowedBy(access_token, media, followed, follows),
                      statisticsController.getTwelveMostLikedPictures(access_token)])
}
module.exports = router;
