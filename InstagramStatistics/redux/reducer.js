"use strict";
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

    case 'SAVE_TOKENS':
      return Object.assign({}, currState, {
        user: {
          tokens: {
            idToken: action.tokens.idToken,
            accessToken: action.tokens.accessToken,
            timestamp: new Date()
          }
        }
      });
    case 'SAVE_PROFILE':
      return Object.assign({}, currState, {
        user: {
          tokens: {
            idToken: action.tokens.idToken,
            accessToken: action.tokens.accessToken,
            timestamp: new Date()
          },
          profile: action.profile
        }
      });
    case 'SAVE_STATISTICS':
      return Object.assign({}, currState, {
        statistics: {
          mediaOverTime: action.counts.mediaOverTime,
          followed_byOverTime: action.counts.followed_byOverTime,
          followsOverTime: action.counts.followsOverTime,
          topTwelve: action.topTwelve
        }
      });
    case 'LOGOUT':
      return Object.assign({}, currState, {
        user: {
          profile: null,
          tokens: {
            idToken: null,
            accessToken: null,
            timestamp: new Date()
          }
        }
      });
    case 'TOGGLE_NEXT':
      var next = currState.currentSlide + 1;
      if (next > action.slideLength - 1) {
        next = 0;
      }
      return Object.assign({}, currState, {
        currentSlide: next
      });
    case 'TOGGLE_PREV':
      var prev = currState.currentSlide - 1;
      if (prev < 0) {
        prev = action.slideLength - 1;
      }
      return Object.assign({}, currState, {
        currentSlide: prev
      });
    default:
      return currState;
  }
}
