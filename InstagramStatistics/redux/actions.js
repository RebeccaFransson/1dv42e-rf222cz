/*{
  type: 'SHOW_ABOUT'
  //, data: 'somedata'
}*/
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
  logout: function(){
    return{
      type: 'LOGOUT'
    }
  }
}
export default actions;
