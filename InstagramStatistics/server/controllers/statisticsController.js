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
  },
  getTwelveMostLikedPictures: function(token){
    console.log('getTenMostLikedPictures');
    return new Promise(function(resolve, reject){
      var max_id = '';
      request('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&max_id='+max_id,
      function (error, response, body) {
        var topTwelve = [];
        var responseArray = JSON.parse(body).data;
        //Räkna ut bilden med minst likes

        if (!error && response.statusCode == 200) {
          for (let i = 0; i < responseArray.length; i++) {
            //sortera topTwelve, kolla om nya är mer eller mindre än sista(minsta) värdet i arrayen såfall ersätt
            topTwelve.sort(function(a, b){
              var x = a['likes']; var y = b['likes'];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0))});
            if(topTwelve.length < 12){
              topTwelve.push({
                url: responseArray[i].images.thumbnail.url,
                likes: responseArray[i].likes.count
              });
            }else{
              //Jamför och ersätt om minsta värdet är mindre än nya värdet
              if(topTwelve[0].likes < responseArray[i].likes.count){
                topTwelve.splice(0, 1);
                topTwelve.push({
                  url: responseArray[i].images.thumbnail.url,
                  likes: responseArray[i].likes.count
                });
              }
            }
          }
          //Måste fråga en gång till och ändra max_id
          topTwelve.sort(function(a, b){
            var x = a['likes']; var y = b['likes'];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0))});
          //console.log(topTwelve);
          //Spara bilden och antal likes
          //Jämföra med andra bilder ta ut den som är minst och jämför med den nya



          //Skicka tillbaka array med tio populäraste
          resolve({topTwelve: topTwelve});
        }else{
          console.log('error');
          reject(error);
        }
      });

    });
  }

};
