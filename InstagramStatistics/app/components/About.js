import React from 'react';
import actions from '../../redux/actions'


export default class About extends React.Component{

  handleShowAbout() {
    this.props.dispatch(actions.showAbout(!this.props.showAbout));
    //hämta height on
    let windowHeight = window.innerHeight;
    if(this.props.showAbout){
      document.querySelector('.nav-container').style.bottom = '0px';
      document.querySelector('.about-circle').className = ' fa about-circle fa-arrow-circle-up';
    }else{
      document.querySelector('.nav-container').style.bottom = '300px';
      document.querySelector('.about-circle').className = ' fa about-circle fa-arrow-circle-down';
    }
  }

  render() {
      return (
        <div class="nav-container">
          <AboutText/>
            <div class="nav-button">
                <div class="nav-titel">{this.getTitel}</div>
                {this.props.showAbout ?
                   <div class="nav-titel">About</div> :
                   <div class="nav-titel">Close</div>
                 }
                <div onClick={this.handleShowAbout.bind(this)} class="fa about-circle fa-arrow-circle-down" aria-hidden="true"></div>
            </div>
        </div>
      );
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
