"use strict";
var mongoose = require('mongoose');
var User = require('../data/users');

var statisticsController = require("./statisticsController");

module.exports = {
  checkForUpdate: function(){
    var that = this;
    this.getAllUsers().then(function(users, err){
      if (err) {
        console.log(err);
      }
      for (var i = 0; i < users.length; i++) {
        var updateErr = that.updateSavedUser(users[i])
          .then(function(user){
            console.log(user.nickname);
          });
      }
    })
  },
  getAllUsers: function(){
    //var day = (60000*60)*24;//(1min*60min)*24h = dag i millisekunder
    var minute = 60000;
    var compareDate = new Date().getTime() - minute;
    var usersNeedUpdate = [];
    return new Promise(function(resolve, reject){
      User.find({}, function (err, users) {
        if (err) {
          reject(err)
        }
        for (var i = 0; i < users.length; i++) {
          if(true){//new Date(users[i].last_save).getTime() < compareDate
            usersNeedUpdate.push(users[i]);
          }
        }
        resolve(usersNeedUpdate);
      });
    });
  },

  updateSavedUser: function(user){
    //find one and update
    var that = this;
    return new Promise(function(resolve, reject){
      that.getAllStatistics(user.access_token, user.counts.mediaOverTime, user.counts.followed_byOverTime, user.counts.followsOverTime)
      .then(function(data){
        //Hitta och uppdatera existerande användare
        User.findOne({'user_id': user.user_id}, function(err, savedUser){

          savedUser.counts = counts;
          savedUser.topThree = data[1];
          savedUser.last_save = new Date();
          savedUser.save(function (err) {
            if (err)
                reject(err);
            else
                resolve(savedUser);
          });


      });
      });
    });
  },
  getAllStatistics: function(access_token, media, followed, follows){
    return Promise.all([statisticsController.mediaAndFollowedBy(access_token, media, followed, follows),
                        statisticsController.getThreeMostLikedPictures(access_token)])
  }
}
