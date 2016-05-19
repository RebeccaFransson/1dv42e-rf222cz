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
      this.handleSaveProfileToDB(profile).then(function(data, err){
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
    window.location.hash = '';
  }

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

            <Statistics statistics={this.props.statistics}/>
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
    console.log(this.props.statistics.mediaOverTime.length);
    if(this.props.statistics.mediaOverTime.length < 1){
      return(
          <div class="col-md-12">
            <div class="loader"></div>
            Gathering information
          </div>
      );
    }else{
      console.log(this.props.statistics.topTwelve);
        return(
          <div class="col-md-12">
            <div class="col-md-3"><span class="fa fa-arrow-circle-left next-btn"/></div>

            <div class="col-md-6">
              <div id="statistics-background">
              <div id="statistics">
                  {this.props.statistics.topTwelve.map(function(image, index){
                    return (
                        <li key={index} class="topTwelvePicture">
                          <img src={image.url}/>
                          <span class="fa fa-heart">{image.likes}</span>
                        </li>
                    )
                  })}
                </div>
              </div>
            </div>

            <div class="col-md-3"><span class="fa fa-arrow-circle-right next-btn"/></div>
          </div>
        );
    }

  }
}
