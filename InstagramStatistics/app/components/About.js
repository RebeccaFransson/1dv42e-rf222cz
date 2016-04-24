import React from 'react';

export default class About extends React.Component{

  constructor(){
    super();
    this.state = {showAbout: false};
    this.showAbout = this.showAbout.bind(this);
  }

  showAbout() {
    console.log('klick');
    console.log(this);
    this.setState({showAbout: !this.state.showAbout});

  }

  render() {// class="col-md-4 btn btn-block btn-social btn-lg btn-instagram"
    console.log(this.state.showAbout);
    if(this.state.showAbout){
      return (
        <div class="">
            <div class="nav nav-masthead">
                <div class="nav-text" >About</div>
                <div onClick={this.showAbout} class="fa fa-arrow-circle-up about-circle" aria-hidden="true"></div>
            </div>
        </div>
      );
    }else{
      return (
        <div class="">
            <div class="nav nav-masthead">
                <div class="nav-text" >hej</div>
                <div onClick={this.showAbout} class="fa fa-arrow-circle-down about-circle" aria-hidden="true"></div>
            </div>
        </div>
      );
    }
  }
};
