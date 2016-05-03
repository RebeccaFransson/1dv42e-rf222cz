

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
  saveProfile: function(profile, idToken){
    return{
      type: 'SAVE_PROFILE',
      profile: profile,
      idToken: idToken
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
