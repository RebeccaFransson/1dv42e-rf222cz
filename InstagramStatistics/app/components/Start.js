
import React from 'react';
import LoggedIn from './LoggedIn';
import Login from './Login';

const Auth0Lock = require('auth0-lock');

export default class Start extends React.Component{
//kanske const?
  componentWillMount(){
    this.lock = new Auth0Lock('WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV', 'ymafransson.eu.auth0.com');
    this.setState({idToken: this.getIdToken()});//this.getIdToken()
  }
  getIdToken(){
    //var idToken = localStorage.getItem('userToken');
    var idToken = null;
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }
  render(){
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
      //return (<Login lock={this.lock} />);
    } else {

      return (<Login lock={this.lock} />);
    }
  }
};
