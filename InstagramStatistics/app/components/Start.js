var React = require("react");
var LoggedIn = require("./LoggedIn.js");
var Login = require("./Login.js");

const Auth0Lock = require('auth0-lock');

module.exports = React.createClass({

  componentWillMount: function() {
    this.lock = new Auth0Lock('WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV', 'ymafransson.eu.auth0.com');
    this.setState({idToken: this.getIdToken()})
  },
  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  },
  render: function() {
    console.log('hej');
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {

      return (<Login lock={this.lock} />);
    }
  }
});
