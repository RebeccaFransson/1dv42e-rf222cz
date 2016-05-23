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
    this.props.dispatch(actions.savetoken(this.getToken()));
  }

  getToken(){
    let token = sessionStorage.getItem('userToken');
    let authHash = this.lock.parseHash(window.location.hash);
    if(token != null){
      console.log('skapa');
      //var accessToken = JSON.parse(token).accessToken;
      var idToken = JSON.parse(token);
    }else{
      console.log('skapa null');
      //var accessToken = null;
      var idToken = null;
    }
    if (!token && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        //accessToken = authHash.access_token;
        //let usertoken = JSON.stringify({idToken: idToken});
        sessionStorage.setItem('userToken', JSON.stringify(idToken));
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }
  render(){
    if (this.props.user.token) {
      return (<LoggedIn
        dispatch={this.props.dispatch}
        profile={this.props.user.profile}
        lock={this.lock}
        token={this.props.user.token}
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
