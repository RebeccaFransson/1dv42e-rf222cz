
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
    //fullösning måste fixas
    //console.log(sessionStorage.getItem('userToken'));
    //if(sessionStorage.getItem('userToken')){
      //console.log('inne');
    this.props.dispatch(actions.saveIdToken(this.getIdToken()));

    //måste kolla om den är äldre än 2 dagar, om så - sätt ny storage
    /*console.log(this.props.user);
    var timestamp = new Date(this.props.user.token.timestamp);
    timestamp.setDate(timestamp.getDate() + 5);
    if(this.props.user.token.timestamp > timestamp.getTime()){

    }
    */
    /*}else{
      this.getIdToken();
    }*/

  }

  getIdToken(){
    var idToken = sessionStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        //let userTokenProps = JSON.stringify({token: authHash.id_token});
        sessionStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }
  render(){
    if (this.props.user.token.idToken) {
      return (<LoggedIn dispatch={this.props.dispatch} profile={this.props.user.profile} lock={this.lock} idToken={this.props.user.token.idToken} />);
    } else {
      return (
        <div>
          <Login lock={this.lock} />
        </div>);
    }
  }
};
//<About dispatch={this.props.dispatch} showAbout={this.props.showAbout}/>

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps)(Start);
