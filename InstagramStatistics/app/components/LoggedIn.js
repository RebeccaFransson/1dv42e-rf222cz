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
      var that = this;
      this.handleSaveProfileToDB(profile).then(function(data){
        console.log(data);
        that.props.dispatch(actions.saveStatistics(data));
      });
    }.bind(this));

  }

  handleSaveProfileToDB(profile){
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
//.statistics.topTen[0].likes
  render() {
    if (this.props.profile) {
      return (
        <div>
          <div class="col-md-12 loggedin-top">
            <div class="col-md-2"></div>
            <h1 class="col-md-8">Welcome {this.props.profile.nickname}</h1>
            <div class="col-md-2">
              <button class="fa fa-sign-out btn btn-secondary logout-btn" onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
          </div>
          <div class="col-md-12">
            <div class="col-md-3"></div>
            <div class="col-md-6" id="statistics-wrapper">
              <Statistics statistics={this.props.statistics}/>
            </div>
            <div class="col-md-3"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="col-md-12 loggedin-top">
          <div class="col-md-2"></div>
          <h1 class="col-md-8">Loading profile...</h1>
          <div class="col-md-2"></div>
        </div>
      );
    }
  }
};

class Statistics extends React.Component{
  render(){
    if(this.props.statistics.mediaOverTime.length == null){
      return(
          <h3 class="col-md-6">
            <div class="loader"></div>
            Gathering information
          </h3>
      );
    }else{
      console.log(this.props.statistics.topTen);
        return(
            <div id="statistics-background">
              {this.props.statistics.topTen.map(function(image, index){
                return (
                    <li key={index} class="topTenPicture">
                      <img src={image.picture}/>
                      <span class="fa fa-heart">{image.likes}</span>
                    </li>
                )
              })}
            </div>
        );
    }

  }
}
