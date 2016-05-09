"use strict";

let actions = {
  showAbout: function(show){
    return{
      type: 'SHOW_ABOUT',
      showAbout: show
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
  /*
  saveProfileDB: function(profile, idToken){
    console.log('ajax');
    $.ajax({
      method: "POST",
      url: "/saveProfile",
      dataType: "json",
      data: {
        id: profile.id,
        nickname: profile.nickname
        }
      })
  },*/
  logout: function(){
    return{
      type: 'LOGOUT'
    }
  }
}
export default actions;
