import React from 'react';

export default class LoggedIn extends React.Component{
  constructor(props) {
    super(props);
    this.state = {profile: null};
  }
  componentDidMount() {
    // In this case, the lock and token are retrieved from the parent component
    // If these are available locally, use `this.lock` and `this.idToken`
    this.props.lock.getProfile(this.props.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      this.setState({profile: profile});
      //console.log(profile);
    }.bind(this));
  }

  render() {
    if (this.state.profile) {
      return (
        <h2>Welcome {this.state.profile.nickname}</h2>
      );
    } else {
      return (
        <div className="loading">Loading profile</div>
      );
    }
  }
};
