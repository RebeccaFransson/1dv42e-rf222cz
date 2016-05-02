
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
    return{
      type: 'SAVE_PROFILE',
      profile: profile
    }
  },
  saveProfileDB: function(profile){
    console.log(profile);
    return{
    type: 'SAVE_PROFILE_DB',
    data: $.ajax({
      method: "POST",
      url: "/"+profile.nickname,
      dataType: "json",
      data: {
        id: profile.id,
        nickname: profile.nickname
      }
    }
  },
  logout: function(){
    return{
      type: 'LOGOUT'
    }
  }
}
export default actions;
