"use strict";
/*
Tar gamla staten, kopierar den och ändrar på kopian
*/
export default function reducer(currState, action){
  switch (action.type) {
    case 'SHOW_ABOUT':
      //Skapar nytt objekt med den gamla staten, ersätter gamla information med nya
      //På så sätt kan jag hålla koll på en gamla datan

    case 'SAVE_TOKEN':
      return Object.assign({}, currState, {
        user: {
          token: action.token
        }
      });
    case 'SAVE_PROFILE':
      return Object.assign({}, currState, {
        user: {
          token: action.token,
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
          token: null
        }
      });
    case 'TOGGLE_NEXT':
    console.log(action);
      var next = action.slides.indexOf(currState.currentSlide) + 1;
      if(next >= 3){//TODO: 0byt ut mer dynamiskt
        next = 0;
      }
      return Object.assign({}, currState, {
        currentSlide: action.slides[next]
      });
    default:
      return currState;
  }
}
