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
  getTenMostLikedPictures: function(token){
    console.log('getTenMostLikedPictures');
    return new Promise(function(resolve, reject){
      var max_id = '';
      request('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&max_id='+max_id,
      function (error, response, body) {
        var topTen = [];
        var responseArray = JSON.parse(body).data;
        //Räkna ut bilden med minst likes
        function indexOfSmallest(a){
         var lowest = 0;
         for (var i = 1; i < a.length; i++) {
          if (a[i].likes < a[lowest].likes) lowest = i;
         }
         return lowest;
        }

        if (!error && response.statusCode == 200) {
          for (let i = 0; i < responseArray.length; i++) {
            //sortera topten, kolla om nya är mer eller mindre än sista(minsta) värdet i arrayen såfall ersätt
            topTen.sort(function(a, b){
              var x = a['likes']; var y = b['likes'];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0))});
            if(topTen.length < 10){
              topTen.push({
                picture: responseArray[i].images.thumbnail.url,
                likes: responseArray[i].likes.count
              });
            }else{
              //Jamför och ersätt om minsta värdet är mindre än nya värdet
              if(topTen[0].likes < responseArray[i].likes.count){
                topTen.splice(0, 1);
                topTen.push({
                  picture: responseArray[i].images.thumbnail.url,
                  likes: responseArray[i].likes.count
                });
              }
            }
          }
          //Måste fråga en gång till och ändra max_id
          topTen.sort(function(a, b){
            var x = a['likes']; var y = b['likes'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0))});
          //console.log(topTen);
          //Spara bilden och antal likes
          //Jämföra med andra bilder ta ut den som är minst och jämför med den nya



          //Skicka tillbaka array med tio populäraste
          resolve({topTen: topTen});
        }else{
          console.log('error');
          reject(error);
        }
      });

    });
  }

};
