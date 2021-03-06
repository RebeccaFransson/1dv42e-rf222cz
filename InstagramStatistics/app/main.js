import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Start from './components/Start';
import configureStore from '../redux/store';

let initialSate = {
  user: {
    profile: null,
    token: null
  },
  showAbout: false,
  currentSlide: 'topThree',
  error: null,
  statistics: {
    mediaOverTime: [],
    followed_byOverTime: [],
    followsOverTime: [],
    topThree: []
  }
}
//createstore
let store = configureStore(initialSate)

ReactDOM.render(
  <Provider store={store}>
    <Start />
  </Provider>, document.getElementById("container")
);
