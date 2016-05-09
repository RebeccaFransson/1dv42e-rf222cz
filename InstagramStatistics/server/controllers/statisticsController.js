"use strict";
var $ = require('jquery');
module.exports = {
  getAllLikes: function() {
    console.log('inne i andra controllern');
  },
  mediaAndFollowedBy: function(id, media, followed_by, token){
    console.log(id);
    /*$.ajax({
      url: 'https://api.instagram.com/v1/users/self/?access_token=',
      method: "GET",
      dataType: "json",
      contentType: "application/json"
    })*/
    return id;
  }

};
