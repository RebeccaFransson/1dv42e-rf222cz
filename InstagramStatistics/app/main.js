import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Start from './components/Start';
import About from './components/About';
import configureStore from '../redux/store';

let initialSate = {
  user: {
    profile: null,
    token: {
      idToken: null,
      timestamp: new Date()
    }
  },
  showAbout: false
}
//createstore
let store = configureStore(initialSate)

ReactDOM.render(
  <Provider store={store}>
    <Start />
  </Provider>, document.getElementById("container")
);
