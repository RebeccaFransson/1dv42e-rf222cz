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
    //fullösning måste fixas
    //console.log(sessionStorage.getItem('userToken'));
    //if(sessionStorage.getItem('userToken')){
      //console.log('inne');
    this.props.dispatch(actions.saveTokens(this.getTokens()));

    //måste kolla om den är äldre än 2 dagar, om så - sätt ny storage
    /*console.log(this.props.user);
    var timestamp = new Date(this.props.user.token.timestamp);
    timestamp.setDate(timestamp.getDate() + 5);
    if(this.props.user.token.timestamp > timestamp.getTime()){

https://api.instagram.com/oauth/authorize/?client_id=WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV&redirect_uri=http://localhost:27017/&response_type=token

    }
    */
    /*}else{
      this.getIdToken();
    }*/

  }

  getTokens(){
    let tokens = sessionStorage.getItem('userTokens');
    let authHash = this.lock.parseHash(window.location.hash);
    console.log(authHash);
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
      return (<LoggedIn dispatch={this.props.dispatch} profile={this.props.user.profile} lock={this.lock} tokens={this.props.user.tokens}/>);
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
