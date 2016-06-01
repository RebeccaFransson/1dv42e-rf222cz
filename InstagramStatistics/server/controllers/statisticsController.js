"use strict";
var request = require('request');

module.exports = {
  mediaAndFollowedBy: function(token, media, followed_by, follows){
    return new Promise(function(resolve, reject){
      request('https://api.instagram.com/v1/users/self/?access_token='+token,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          media.push({count: JSON.parse(body).data.counts.media, date: new Date()});
          followed_by.push({count: JSON.parse(body).data.counts.followed_by, date: new Date()});
          follows.push({count: JSON.parse(body).data.counts.follows, date: new Date()});
          resolve({mediaOverTime: media, followed_byOverTime: followed_by, followsOverTime: follows});
        }else{
          reject('Couldnt get statistics: '+ error);
        }
      });

    });
  },
  getThreeMostLikedPictures: function(token){
    return new Promise(function(resolve, reject){
      var max_id = '';
      var topThree = [];
      //TODO: om instagram kan ge fler än 20 bilde -> while loop för att se om max_id finns
      request('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&count=19&max_id='+max_id,
      function (error, response, body) {

        var responseArray = JSON.parse(body).data;
        //Räkna ut bilden med minst likes

        if (!error && response.statusCode == 200) {
          for (var i = 0; i < responseArray.length; i++) {
            //sortera topThree, kolla om nya är mer eller mindre än sista(minsta) värdet i arrayen såfall ersätt
            topThree.sort(function(a, b){
              var x = a['likes']; var y = b['likes'];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0))});
            if(topThree.length < 3){
              topThree.push({
                url: responseArray[i].images.thumbnail.url,
                likes: responseArray[i].likes.count
              });
            }else{
              //Jamför och ersätt om minsta värdet är mindre än nya värdet
              if(topThree[0].likes < responseArray[i].likes.count){
                topThree.splice(0, 1);
                topThree.push({
                  url: responseArray[i].images.thumbnail.url,
                  likes: responseArray[i].likes.count
                });
              }
            }
          }
          //Måste fråga en gång till och ändra max_id
          topThree.sort(function(a, b){
            var x = a['likes']; var y = b['likes'];
            return ((x < y) ? 1 : ((x > y) ? -1 : 0))});
          //console.log(topThree);
          //Spara bilden och antal likes
          //Jämföra med andra bilder ta ut den som är minst och jämför med den nya


          //Skicka tillbaka array med tio populäraste
          resolve(topThree);
        }else{
          reject('Couldnt get the top three pictures: ', error);
        }
      });

    });
  }

};
