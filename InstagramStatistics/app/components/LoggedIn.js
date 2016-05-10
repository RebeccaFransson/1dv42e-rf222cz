"use strict";
var $ = require("jquery");

import React from 'react';
import actions from '../../redux/actions'

//const url = 'http://188.166.116.158:8000';//publik
const url = 'http://localhost:27017';//lokal

export default class LoggedIn extends React.Component{


  componentDidMount() {
    this.props.lock.getProfile(this.props.tokens.idToken, function (err, profile) {
      if (err) {
        console.log(err);
        console.log("Error loading the Profile", err);
        return;
      }
      this.props.dispatch(actions.saveProfile(profile, this.props.tokens));
      this.handleSaveProfileToDB(profile).then(function(ja){
        console.log(ja);
      })
    }.bind(this));

  }

  handleSaveProfileToDB(profile){
    /*return fetch(url+'/saveProfile', {
      data: JSON.stringify({profile: profile, access_token: this.props.tokens.accessToken}),
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      },
      dataType: "json",
      contentType: "application/json",
      method: 'POST',
      cache: false
    });*/
    return $.ajax({
        url: url+'/saveProfile',
        data: JSON.stringify(profile),
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('userTokens')).idToken
        }
    })
  }
  handleLogout(e){
    e.preventDefault();
    sessionStorage.removeItem('userTokens');
    this.props.dispatch(actions.logout());
    //redirect
  }

  render() {
    if (this.props.profile) {
      return (
        <div class="col-md-12 loggedin-top">
          <div class="col-md-2"></div>
          <h1 class="col-md-8">Welcome {this.props.profile.nickname}</h1>
          <div class="col-md-2">
            <button class="fa fa-sign-out btn btn-secondary logout-btn" onClick={this.handleLogout.bind(this)}>Logout</button>
          </div>

        </div>
      );
    } else {
      return (
        <div class="col-md-12 loggedin-wrapper">
          <div class="col-md-2"></div>
          <h1 class="col-md-8">Loading profile...</h1>
          <div class="col-md-2"></div>
        </div>
      );
    }
  }
};

class loading extends React.Component{
  render(){
    <div class="col-md-12 loading-scen">
      <div class="col-md-4"></div>
      <h3 class="col-md-4">
        <div class="loader"></div>
        Gathering information
      </h3>
      <div class="col-md-4"></div>
    </div>
  }
}
