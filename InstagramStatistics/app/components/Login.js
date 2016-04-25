import React from 'react';

export default class Login extends React.Component{

   handleShowLock(){
    this.props.lock.show();
  }

  render() {
    return (
      <div class="col-md-12 start">
        <a class="start-btn">
            <button onClick={this.handleShowLock.bind(this)} class="login-btn">
            <span class="fa fa-instagram pic-in-span"></span>
            Calculate
            <span class="fa fa-line-chart pic-in-span"></span>
          </button>
        </a>
      </div>
    );
  }
};
