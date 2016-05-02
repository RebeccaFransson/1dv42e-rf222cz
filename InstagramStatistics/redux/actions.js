var $ = require("jquery");
var promise = require("es6-promise");

let actions = {
  showAbout: function(show){
    return{
      type: 'SHOW_ABOUT',
      showAbout: show
    }
  },
  saveIdToken: function(idToken){
    return{
      type: 'SAVE_IDTOKEN',
      idToken: idToken
    }
  },
  saveProfile: function(profile){
    $.ajax({
      method: "POST",
      url: "/"+profile.nickname,
      dataType: "json",
      data: {
        id: profile.id,
        nickname: profile.nickname
        }
      })
    return{
      type: 'SAVE_PROFILE',
      profile: profile
    }
  },
  logout: function(){
    return{
      type: 'LOGOUT'
    }
  }
}
export default actions;
