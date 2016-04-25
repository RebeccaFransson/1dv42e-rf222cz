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
        <div>
          <h2>Welcome {this.props.profile.nickname}</h2>
          <button class="fa fa-sign-out btn btn-secondary" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
};
