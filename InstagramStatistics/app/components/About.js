import React from 'react';
import actions from '../../redux/actions'

export default class About extends React.Component{

  handleShowAbout() {
    this.props.dispatch(actions.showAbout(!this.props.showAbout));
  }

  render() {// class="col-md-4 btn btn-block btn-social btn-lg btn-instagram"
    if(this.props.showAbout){
      return (
        <div class="">
            <div class="nav nav-masthead">
                <div class="nav-text" >Start</div>
                <div onClick={this.handleShowAbout.bind(this)} class="fa fa-arrow-circle-down about-circle" aria-hidden="true"></div>
            </div>
        </div>
      );
    }else{
      return (
        <div class="nav-container">
            <div class="nav">
                <div class="nav-text" >About</div>
                <div onClick={this.handleShowAbout.bind(this)} class="fa fa-arrow-circle-up about-circle" aria-hidden="true"></div>
            </div>
        </div>
      );
    }
  }
};
