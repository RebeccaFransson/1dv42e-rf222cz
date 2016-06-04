"use strict";
//Man kallar på en action som sedan tas vidare till reducern med hjälp utav arkitekturen readux.
let actions = {
  setError: function(err){
    return {
      type: 'SET_ERROR',
      error: err
    }
  },
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
      topThree: statistics.topThree
    }
  },
  logout: function(){
    return{
      type: 'LOGOUT'
    }
  }
}
export default actions;
