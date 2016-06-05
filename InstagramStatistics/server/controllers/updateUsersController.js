"use strict";
var mongoose = require('mongoose');
var User = require('../data/users');

var statisticsController = require("./statisticsController");

module.exports = {
  //Kollar vilka användare som behöver uppdaeras och uppdaerar dem
  checkForUpdate: function(){
    var that = this;
    this.getAllUsers().then(function(users, err){
      if (err) {
        console.log(err);
      }else{
        for (var i = 0; i < users.length; i++) {
          var updateErr = that.updateSavedUser(users[i])
            .then(function(user){
              console.log('---> '+user.nickname);
            });
        }
      }
    })
  },
  getAllUsers: function(){
    //Hämtar ut alla användare som behöver en uppdatering
    var nowTime = new Date();
    var nowTimeConvert = nowTime.getFullYear() + "/" + (nowTime.getMonth() + 1) + "/" + nowTime.getDate();

    var usersNeedUpdate = [];
    return new Promise(function(resolve, reject){
      User.find({}, function (err, users) {
        if (err) {
          console.log('Unable to find users');//Detta hamnar bara på serven så inget som användaren behöver se
        }else{
          for (var i = 0; i < users.length; i++) {
            var savedTimestamp = new Date(users[i].last_save);
            var savedTimestampConvert = savedTimestamp.getFullYear() + "/" + (savedTimestamp.getMonth() + 1) + "/" + savedTimestamp.getDate();
            if(savedTimestampConvert != nowTimeConvert){//Kolla om den är äldre än en dag
              usersNeedUpdate.push(users[i]);
            }
          }
          resolve(usersNeedUpdate);
        }
      });
    });
  },

  updateSavedUser: function(user){
    //Hitta och uppdatera existerande användare
    var that = this;
    return new Promise(function(resolve, reject){
      that.getAllStatistics(user.access_token, user.counts.mediaOverTime, user.counts.followed_byOverTime, user.counts.followsOverTime)
      .then(function(data){
        User.findOne({'user_id': user.user_id}, function(err, savedUser){

          savedUser.counts = data[0];
          savedUser.topThree = data[1];
          savedUser.last_save = new Date();
          savedUser.save(function (err) {
            if (err)
                console.log('Unable to save user '+savedUser.nickname);
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
