"use strict";
var request = require('request');

module.exports = {
  getAllLikes: function() {
    console.log('inne i andra controllern');
  },
  mediaAndFollowedBy: function(token, media, followed_by, follows){
    console.log('mediaAndFollowedBy');
    return new Promise(function(resolve, reject){
      request('https://api.instagram.com/v1/users/self/?access_token='+token,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          media.push({count: JSON.parse(body).data.counts.media, date: new Date()});
          followed_by.push({count: JSON.parse(body).data.counts.followed_by, date: new Date()});
          follows.push({count: JSON.parse(body).data.counts.follows, date: new Date()});
          resolve({media: media, followed_by: followed_by, follows: follows});
        }else{
          console.log('error');
          reject(error);
        }
      });

    });
  }

};
