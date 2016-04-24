import React from 'react';

export default class Login extends React.Component{

  showLock(props) {
    console.log(this);
    props.lock.show();
  }

  render() {// class="col-md-4 btn btn-block btn-social btn-lg btn-instagram"
    console.log(this);
    return (
    <div class="col-md-12 start">
      <a onClick={this.showLock(this.props)} class="start-btn">
        <span class="fa fa-instagram"></span> Get your statistics
      </a>
    </div>
  );
  }
};
