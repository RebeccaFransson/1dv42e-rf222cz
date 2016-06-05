"use strict";
import React from 'react';
import { connect } from 'react-redux';

import LoggedIn from './LoggedIn';
import Login from './Login';
import actions from '../../redux/actions'

const Auth0Lock = require('auth0-lock');

class Start extends React.Component{

  componentWillMount(){
    //Uppgifter från mitt Auth0 konto för att kunna använda Auth0
    this.lock = new Auth0Lock('WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV', 'ymafransson.eu.auth0.com');
    this.props.dispatch(actions.savetoken(this.getToken()));
  }

  getToken(){
    //Hämtar användaren authentisierings uppgifter med hjälp utav Auth0
    let token = sessionStorage.getItem('userToken');
    let authHash = this.lock.parseHash(window.location.hash);
    if(token != null){
      var idToken = JSON.parse(token);
    }else{
      var idToken = null;
    }
    if (!token && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
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
    //Om användaren är inloggad så visar vi förstasidan, annars inloggningssidan
    if (this.props.user.token) {
      return (<LoggedIn
        dispatch={this.props.dispatch}
        profile={this.props.user.profile}
        lock={this.lock}
        token={this.props.user.token}
        statistics={this.props.statistics}
        error={this.props.error}/>);
    } else {
      return (
        <div>
          <Login lock={this.lock} />
        </div>);
    }
  }
};

//Denna react-komponenten får tag i all data på staten
function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(Start);
