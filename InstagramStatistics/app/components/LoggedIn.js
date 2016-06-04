"use strict";
var $ = require("jquery");

import React from 'react';
import actions from '../../redux/actions';
import StatisticsSlides from './StatisticsSlides';

export default class LoggedIn extends React.Component{

  componentWillMount() {
    //hämtar användarprofilen från auth0
    var that = this;
    this.props.lock.getProfile(this.props.token, function (err, profile) {
      if (err) {
        that.props.dispatch(actions.setError('Error loading the Profile: '+err));
      }
      this.props.dispatch(actions.saveProfile(profile, this.props.token));

      //Hämtar information från servern och sparar den eller skriver ut error
      this.handleSaveProfileToDB(profile)
      .then(function(data){
        that.props.dispatch(actions.saveStatistics(data));

      })
      .catch(function(err){
        that.props.dispatch(actions.setError(err));
      })

    }.bind(this));
  }

  //Skickar användar information till servern och får data om användarens instagram tillbaka
  handleSaveProfileToDB(profile){
    return new Promise(function(resolve, reject){
      $.ajax({
          url:        window.location.origin+'/saveProfile',
          data:       JSON.stringify(profile),
          method:     "POST",
          dataType:   "json",
          contentType:"application/json",
          success:    function (data) { resolve(data) },
          error:      function (xhr, status, error) { reject(xhr.responseText) }
      })
    });
  }

  //Loggar ut användaren
  handleLogout(e){
    e.preventDefault();
    sessionStorage.removeItem('userToken');
    this.props.dispatch(actions.logout());
    //redirect
    window.location.hash = '';
  }

  //Visar och stänger info-rutan
  handleInfo(e){
    if(e.target.id == 'close'){
      $('#info').css({'visibility':'hidden', 'opacity':'0', 'z-index': '0'})
    }else{
      $('#info').css({'visibility':'visible', 'opacity':'1', 'z-index': '100'})
    }
  }

  render() {
    var that = this;
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
                <button class="fa fa-question btn btn-secondary info-btn" onClick={this.handleInfo.bind(this)}><span> Info</span></button>
              </div>
              <div id="info" class="overlay">
                <div class="popup">
                <div class="closebox">
                <a id="close" onClick={this.handleInfo.bind(this)}>&times;</a>
                </div>
                  <h2>Instagram Statistics</h2>
                  <div class="allContent">
                    <div class="content">
                      <h3>Top three</h3>
                      This funktionallity gets your 20 most recent media on your Instagram then makes a calculation on which of your pictures has the most likes.
                      <br/>
                      <br/>
                      Top three can change over time but old top threes will not save in the database.
                    </div>
                    <div class="content">
                      <h3>Graphs</h3>
                      Your graphs will start out as nothing.
                      <br/>
                      But when you log in, once a day or so, the app will update the data and the graphs will start to show.
                      <br/>
                      <br/>
                      <p>Not to worry!</p>
                      If your become inactive the app will still update your data, but only once a week!
                    </div>
                    <div class="content">
                      <h3>Examples</h3>
                      <img src="ExampleGraph2.png"/>
                      <img src="ExampleGraph3.png"/>
                      <img src="ExampleGraph.png"/>
                    </div>
                  </div>
                  <div class="bottomContent">
                    <h3>Development</h3>
                    Developed by Rebecca Fransson<br/>
                    Created with: <b>Javascript</b> - <b>React</b> - <b>Redux</b> on the client-side and <b>Node.js</b> for the server-side.
                  </div>
                </div>
              </div>
            </div>
          </div>
            <Statistics statistics={this.props.statistics} error={this.props.error} dispatch={this.props.dispatch}/>
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
              Loading user profile...
            </div>
        </div>
      );
    }
  }
};

class Statistics extends React.Component{
  render(){
    //Kollar om något error finns så fall skrivs det ut
    //Annars skrivs en laddningsscen ut
    //När statistics har blivit satt i staten visas slidesen
    if(this.props.statistics.mediaOverTime.length < 1){
      if(this.props.error != undefined){
        return(
          <div class="col-md-12 loading">
            Following error from the server:
            <p>{this.props.error}</p>
          </div>
        );
      }else{
        return(
          <div class="col-md-12 loading">
            Gathering information...
          </div>
        );
      }
    }else{
        return(
            <StatisticsSlides statistics={this.props.statistics} slides={this.slides}/>
        );
    }
  }
}
