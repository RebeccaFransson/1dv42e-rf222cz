import React from 'react';
import actions from '../../redux/actions'

export default class LoggedIn extends React.Component{

  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.props.dispatch(actions.saveProfile(profile));
      this.props.dispatch(actions.saveProfileDB(profile));
    }.bind(this));
  }

  handleLogout(e){
    e.preventDefault();
    localStorage.removeItem('userToken');
    this.props.dispatch(actions.logout());
  }

  render() {
    if (this.props.profile) {
      return (
        <div class="col-md-12 loggedin-top">
          <div class="col-md-2"></div>
          <h1 class="col-md-8">Welcome {this.props.profile.nickname}</h1>
          <div class="col-md-2">
            <button class="fa fa-sign-out btn btn-secondary logout-btn" onClick={this.handleLogout.bind(this)}>Logout</button>
          </div>

        </div>
      );
    } else {
      return (
        <div class="col-md-12 loggedin-wrapper">
          <div class="col-md-2"></div>
          <h1 class="col-md-8">Loading profile...</h1>
          <div class="col-md-2"></div>
        </div>
      );
    }
  }
};

class loading extends React.Component{
  render(){
    <div class="col-md-12 loading-scen">
      <div class="col-md-4"></div>
      <h3 class="col-md-4">
        <div class="loader"></div>
        Gathering information
      </h3>
      <div class="col-md-4"></div>
    </div>
  }
}
