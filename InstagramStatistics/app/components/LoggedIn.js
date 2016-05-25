"use strict";
var $ = require("jquery");

import React from 'react';
import actions from '../../redux/actions';
import StatisticsSlides from './StatisticsSlides';

//const url = 'http://188.166.116.158:8080';//publik
const url = 'http://localhost:8080';//lokal

export default class LoggedIn extends React.Component{

  componentDidMount() {
    this.props.lock.getProfile(this.props.token, function (err, profile) {
      if (err) {
        console.log(err);
        console.log("Error loading the Profile", err);
        return;
      }
      this.props.dispatch(actions.saveProfile(profile, this.props.token));
      var that = this;
      this.handleSaveProfileToDB(profile).then(function(data, err){
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
        contentType: "application/json"
    })
  }
  handleLogout(e){
    e.preventDefault();
    sessionStorage.removeItem('userToken');
    this.props.dispatch(actions.logout());
    //redirect
    window.location.hash = '';
  }

  render() {
    if (this.props.profile) {
      return (
        <div class="cont">
          <div class="col-md-12 loggedin-top">
            <div class="col-md-2"></div>
            <h1 class="col-md-8">Instagram Statistics</h1>
            <div class="col-md-2">
              <div class="btn">
                <button class="fa fa-sign-out btn btn-secondary" onClick={this.handleLogout.bind(this)}><span>Logout</span></button>
                <br/>
                <button class="fa fa-question btn btn-secondary info-btn" onClick={this.handleLogout.bind(this)}><span> Info</span></button>
              </div>
            </div>
          </div>
            <Statistics statistics={this.props.statistics} dispatch={this.props.dispatch}/>
        </div>
      );
    } else {
      return (
        <div class="cont">
          <div class="col-md-12 loggedin-top">
            <div class="col-md-2"></div>
            <h1 class="col-md-8">Instagram Statistics</h1>
            <div class="col-md-2">
              <button class="fa fa-sign-out btn btn-secondary logout-btn" onClick={this.handleLogout.bind(this)}>Logout</button>
            </div>
          </div>
            <div class="col-md-12 loading">
              Loading profile...
            </div>
        </div>
      );
    }
  }
};

class Statistics extends React.Component{
  render(){

    if(this.props.statistics.mediaOverTime.length < 1){
      return(
        <div class="col-md-12 loading">
          Gathering information...
        </div>
      );
    }else{
        return(
            <StatisticsSlides statistics={this.props.statistics} slides={this.slides}/>
        );
    }
  }
}
