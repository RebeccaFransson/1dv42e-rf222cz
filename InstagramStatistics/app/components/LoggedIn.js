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

  render() {
    if (this.props.profile) {
      return (
        <h2>Welcome {this.props.profile.nickname}</h2>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
};
