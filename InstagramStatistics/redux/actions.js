"use strict";

let actions = {
  toggleNext: function(slides){
    return{
      type: 'TOGGLE_NEXT',
      slides: slides
    }
  },
  savetoken: function(token){
    return{
      type: 'SAVE_TOKEN',
      token: token
    }
  },
  saveProfile: function(profile, token){
    return{
      type: 'SAVE_PROFILE',
      profile: profile,
      token: token
    }
  },
  saveStatistics: function(statistics){
    return{
      type: 'SAVE_STATISTICS',
      counts: statistics.counts,
      topTwelve: statistics.topTwelve
    }
  },
  logout: function(){
    return{
      type: 'LOGOUT'
    }
  }
}
export default actions;
