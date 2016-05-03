
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
    //console.log(localStorage.getItem('userToken'));
    //if(localStorage.getItem('userToken')){
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
    var idToken = JSON.parse(localStorage.getItem('userToken'));
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken.token && authHash) {
    console.log('inne');
      if (authHash.id_token) {//om id token finns, om localStorage.timestamp är för sen
        idToken.token = authHash.id_token
        console.log('sätter storage');
        let userTokenProps = JSON.stringify({token: authHash.id_token, timestamp: new Date().getTime()});
        localStorage.setItem('userToken', userTokenProps);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken.token;
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
