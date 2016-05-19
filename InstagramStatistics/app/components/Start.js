"use strict";
import React from 'react';
import { connect } from 'react-redux';

import LoggedIn from './LoggedIn';
import Login from './Login';
import About from './About';
import actions from '../../redux/actions'

const Auth0Lock = require('auth0-lock');

class Start extends React.Component{
//kanske constructor?
  componentWillMount(){
    this.lock = new Auth0Lock('WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV', 'ymafransson.eu.auth0.com');
    this.props.dispatch(actions.saveTokens(this.getTokens()));
  }

  getTokens(){
    let tokens = sessionStorage.getItem('userTokens');
    let authHash = this.lock.parseHash(window.location.hash);
    if(tokens != null){
      console.log('skapa');
      var accessToken = JSON.parse(tokens).accessToken;
      var idToken = JSON.parse(tokens).idToken;
    }else{
      console.log('skapa null');
      var accessToken = null;
      var idToken = null;
    }
    if (!tokens && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        accessToken = authHash.access_token;
        let userTokens = JSON.stringify({idToken: idToken, accessToken: accessToken});
        sessionStorage.setItem('userTokens', userTokens);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return {idToken: idToken, accessToken: accessToken};
  }
  render(){
    if (this.props.user.tokens.idToken) {
      return (<LoggedIn
        dispatch={this.props.dispatch}
        profile={this.props.user.profile}
        lock={this.lock}
        tokens={this.props.user.tokens}
        statistics={this.props.statistics}/>);
    } else {
      return (
        <div>
          <Login lock={this.lock} />
        </div>);
    }
  }
};
//<About dispatch={this.props.dispatch} showAbout={this.props.showAbout}/>

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(Start);
