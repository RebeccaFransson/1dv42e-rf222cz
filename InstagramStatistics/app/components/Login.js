import React from 'react';

export default class Login extends React.Component{

  showLock(props) {
    console.log(this);
    props.lock.show();
  }

  render() {
    console.log(this);
    return (
    <div class="">
      <div class="col-md-4"></div>
      <a onClick={this.showLock(this.props)} class="col-md-4 btn btn-block btn-social btn-lg btn-instagram">
        <span class="fa fa-instagram"></span> Sign in with Instagram
      </a>
      <div class="col-md-4"></div>
    </div>
  );
  }
};
