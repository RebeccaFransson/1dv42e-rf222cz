"use strict";
import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducer';

// om så önskas kan extra-tillägg läggas till här, tex logger för development-mode
let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore);

//Default på initialState
export default function configureStore(initialSate = {user: {idToken: null}, showAbout: false}){
  return finalCreateStore(reducer, initialSate)
}
