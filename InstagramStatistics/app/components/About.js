import React from 'react';
import actions from '../../redux/actions'
import move from 'move-js'

export default class About extends React.Component{

  handleShowAbout() {
    this.props.dispatch(actions.showAbout(!this.props.showAbout));
    var hej = document.querySelector(".nav-container");
    console.log(hej);
    move(".about-circle").rotate(180).end();
    if(this.props.showAbout){
      move(".nav-container").set('height', '148px').end();
    }else{
      move(".nav-container").set('height', '400px').end();
    }

  }

  render() {// class="col-md-4 btn btn-block btn-social btn-lg btn-instagram"
    if(this.props.showAbout){
      return (
        <div class="nav-container">
          <AboutText/>
            <div class="nav">
                <div class="nav-titel">Close</div>
                <div onClick={this.handleShowAbout.bind(this)} class="fa fa-arrow-circle-up about-circle" aria-hidden="true"></div>
            </div>
        </div>
      );
    }else{
      return (
        <div class="nav-container">
          <div class="nav">
              <div class="nav-titel" >About</div>
              <div onClick={this.handleShowAbout.bind(this)} class="fa fa-arrow-circle-up about-circle" aria-hidden="true"></div>
          </div>
        </div>
      );
    }
  }
};

class AboutText extends React.Component{
  render(){
    return (
      <div class="col-md-12 about-container">
        <div class="col-md-3"></div>
        <div class="about-text col-md-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    )
  }
};
