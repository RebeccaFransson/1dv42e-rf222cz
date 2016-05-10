"use strict";
var request = require('request');

module.exports = {
  getAllLikes: function() {
    console.log('inne i andra controllern');
  },
  mediaAndFollowedBy: function(token, media, followed_by){
    request('https://api.instagram.com/v1/users/self/?access_token='+token,
    function (error, response, body) {
      console.log(response.body);
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    });
    return token;
  }

};
