
import React from 'react';
import { connect } from 'react-redux';

import LoggedIn from './LoggedIn';
import Login from './Login';
import About from './About';
import actions from '../../redux/actions'

const Auth0Lock = require('auth0-lock');

class Start extends React.Component{
//kanske constructor?
  componentWillMount(){
    this.lock = new Auth0Lock('WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV', 'ymafransson.eu.auth0.com');
    this.props.dispatch(actions.saveIdToken(this.getIdToken()));
  }
  /*
  componentWillMount(){
    this.lock = new Auth0Lock('WIv6wHA65nPGI6XJI96JO6oHAYv2RuiV', 'ymafransson.eu.auth0.com');
    this.setState({idToken: this.getIdToken()});//this.getIdToken()
  }
  */
  getIdToken(){
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
  }
  render(){
    if (this.props.user.idToken) {
      return (<LoggedIn dispatch={this.props.dispatch} profile={this.props.user.profile} lock={this.lock} idToken={this.props.user.idToken} />);
    } else {
      return (
        <div>
          <About dispatch={this.props.dispatch} showAbout={this.props.showAbout}/>
          <Login lock={this.lock} />
        </div>);
    }
  }
};


function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(Start);
