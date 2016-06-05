"use strict";
var mongoose = require('mongoose');
var User = require('../data/users');
var _ = require('underscore');
var storage = require('node-persist');
var statisticsController = require("./statisticsController");

var router = require('express').Router();
router.route('/saveProfile').post(getSavedStats);


function getSavedUser(id) {
  return new Promise(function(resolve, reject){
    User.findOne({ user_id: id }, function (err, user) {
      if (err) {
        reject('Couldnt find user: ',err);
      }
      resolve(user);
    });
  });
}

function getSavedStats(req, res) {
  storage.initSync();
  //Kollar om användaren finns i databasen
  getSavedUser(req.body.user_id)
    .then(function(savedUser){
      if(savedUser != null){
        //Kolla om det sprade datumet är samma som dagens datum
        var savedTimestamp = new Date(savedUser.last_save);
        var savedTimestampConvert = savedTimestamp.getFullYear() + "/" + (savedTimestamp.getMonth() + 1) + "/" + savedTimestamp.getDate();
        var nowTime = new Date();
        var nowTimeConvert = nowTime.getFullYear() + "/" + (nowTime.getMonth() + 1) + "/" + nowTime.getDate();

        if(savedTimestampConvert == nowTimeConvert){//Om ni vill lägga till testdata sätta denna till false
          //Hämtar sparad statistik till redan sparad användare och skickar tillbaka till klienten.
          console.log('Tar från storgare!');
          res.status(200).send(savedUser);
        }else{
          //Hämtar ny statistik till redan sparad användare och skriver över.
          console.log('Hämtar från api...');
          return updateSavedUser(savedUser);
        }
      }else{
        //Hämtar statistik till redan ny användare och sparar användaren.
        console.log('Skapar ny användare: ', req.body.nickname);
        return saveNewUser(req);
      }
    })
    .then(function(user){
      console.log('Allt gick bra!');
      res.status(200).send(user);
    })
    .catch(function(reason) {
      res.status(500).send(reason);
    });
}

function updateSavedUser(savedUser){
  //TEST-DATA om så önskas (Detta eftersom appliktionen börjar räkna från första datumet, och ni kanske vill ha lite exempeldata)
  /*var testcount = {
    mediaOverTime:
   [ { date: new Date('Tue May 02 2016 18:11:59 GMT+0200 (Västeuropa, sommartid)'),
       count: 0 },
     { date: new Date('Tue May 03 2016 18:11:59 GMT+0200 (Västeuropa, sommartid)'),
       count: 1 } ],
  followed_byOverTime:
   [ { date: new Date('Tue May 02 2016 18:11:59 GMT+0200 (Västeuropa, sommartid)'),
       count: 0 },
     { date: new Date('Tue May 03 2016 18:11:59 GMT+0200 (Västeuropa, sommartid)'),
       count: 2 } ],
  followsOverTime:
   [ { date: new Date('Tue May 02 2016 18:11:59 GMT+0200 (Västeuropa, sommartid)'),
       count: 0 },
     { date: new Date('Tue May 03 2016 18:11:59 GMT+0200 (Västeuropa, sommartid)'),
       count: 0 } ]
  }*/
  return new Promise(function(resolve, reject){
    //getAllStatistics(savedUser.access_token, testcount.mediaOverTime, testcount.followed_byOverTime, testcount.followsOverTime)
    getAllStatistics(savedUser.access_token, savedUser.counts.mediaOverTime, savedUser.counts.followed_byOverTime, savedUser.counts.followsOverTime)
    .then(function(data){
      //Uppdatera existerande användare
      User.findOne({'user_id': savedUser.user_id}, function (err, user){
        user.counts = data[0];
        user.topThree = data[1];
        user.last_save = new Date();
        user.save(function (err) {
            if (err)
                reject('Unable to update saved user: '+err);
            else{
                storage.setItem('savedUserStorage', savedUser);
                resolve(savedUser);
            }
        });
      });

    })
    .catch(
      function(reason) {
          reject('Problem getting statistics, '+ reason);
      });
  });
}

function saveNewUser(req){
  return new Promise(function(resolve, reject){
    //Testdata för nya användare för att visa hur graferna kan ser ut
    /*var testcount = {
      "followsOverTime" : [ {"count" : 0, "date" : new Date("2016-06-01T16:11:59.000Z") },
                { "count" : 0, "date" : new Date("2016-06-02T16:11:59.000Z") },
                { "count" : 0, "date" : new Date("2016-06-03T13:50:49.441Z") },
                { "count" : 1, "date" : new Date("2016-06-04T13:50:49.441Z") } ],
              "followed_byOverTime" : [ {"count" : 0,  "date" : new Date("2016-06-01T16:11:59.000Z") },
                { "count" : 1, "date" : new Date("2016-06-02T16:11:59.000Z") },
                { "count" : 3, "date" : new Date("2016-06-03T13:50:49.441Z") },
                { "count" : 4, "date" : new Date("2016-06-04T13:50:49.441Z") } ],
              "mediaOverTime" : [ { "count" : 0, "date" : new Date("2016-06-01T16:11:59.000Z") },
                { "count" : 1, "date" : new Date("2016-06-02T16:11:59.000Z") },
                { "count" : 2, "date" : new Date("2016-06-03T13:50:49.441Z") },
                { "count" : 3, "date" : new Date("2016-06-04T13:50:49.441Z") }  ]
    }*/
    //getAllStatistics(req.body.identities[0].access_token, testcount.mediaOverTime, testcount.followed_byOverTime, testcount.followsOverTime)
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
          topThree: data[1],
          access_token: req.body.identities[0].access_token
        }));
        //Spara ny användare
        user.save(function (err) {
            if (err)
                reject('Unable to save new user'+err);
            else{
                storage.setItem('savedUserStorage', user);
                resolve(user);
            }
        });
      })
      .catch(
        function(reason) {
            resolve('Problem getting statistics, '+ reason);
        });
    });
}

function getAllStatistics(access_token, media, followed, follows){
  //Promise hämtar alla primises i Arrayn och skcikar tillbaka, errors fångas i första funktionen: getSavedStats()
  return Promise.all([statisticsController.mediaAndFollowedBy(access_token, media, followed, follows),
                      statisticsController.getThreeMostLikedPictures(access_token)])
}
module.exports = router;
