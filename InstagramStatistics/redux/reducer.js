/*
Tar gamla staten, kopierar den och ändrar på kopian
*/
export default function reducer(currState, action){
  switch (action.type) {
    case 'SHOW_ABOUT':
      //Skapar nytt objekt med den gamla staten, ersätter gamla information med nya
      //På så sätt kan jag hålla koll på en gamla datan
      return Object.assign({}, currState, {
        showAbout: action.showAbout
      });

    case 'SAVE_IDTOKEN':
      return Object.assign({}, currState, {
        user: {
          idToken: action.idToken
        }
      });
    case 'SAVE_PROFILE':
      return Object.assign({}, currState, {
        user: {
          idToken: currState.user.idToken,
          profile: action.profile
        }
      });
    case 'LOGOUT':
      return Object.assign({}, currState, {
        user: {
          profile: null,
          idToken: null
        }
      });
    default:
      return currState;
  }
}
