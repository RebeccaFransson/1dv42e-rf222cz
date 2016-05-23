"use strict";

let actions = {
  showAbout: function(show){
    return{
      type: 'SHOW_ABOUT',
      showAbout: show
    }
  },
  toggleNext: function(){
    return{
      type: 'TOGGLE_NEXT'
    }
  },
  saveTokens: function(tokens){
    return{
      type: 'SAVE_TOKENS',
      tokens: tokens
    }
  },
  saveProfile: function(profile, tokens){
    return{
      type: 'SAVE_PROFILE',
      profile: profile,
      tokens: tokens
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
