"use strict";
import React from 'react';

export default class Login extends React.Component{

   handleShowLock(){
    this.props.lock.show();
  }

  render() {
    return (
      <div class="col-md-12 start">
        <div class="col-md-2"></div>
        <h1 class="col-md-8">Instagram Statistics</h1>
        <div class="col-md-2"></div>
        <div class="col-md-12">
        <div class="col-md-4"></div>
          <span class="col-md-4 info">Very easy way to see and track your Instagram.
          Just login with your Instagram-account - the app will to the rest!</span>
        <div class="col-md-4"></div>
        </div>
        <div class="col-md-12">
        <div class="col-md-5"></div>
          <button class="login-btn col-md-2" onClick={this.handleShowLock.bind(this)} >
          LET´S GO !
          </button>
        <div class="col-md-5"></div>
        </div>
        <div class="col-md-12"></div>
      </div>
    );
  }
};
/*
<span class="fa fa-instagram pic-in-span"></span>
Calculate
<span class="fa fa-line-chart pic-in-span"></span>
*/
