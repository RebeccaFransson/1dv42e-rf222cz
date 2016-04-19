
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 const FBSDK = require('react-native-fbsdk');

 import Test from "./components/Test";
console.log(Test);
 const {
   LoginButton,
 } = FBSDK;

console.log(LoginButton);
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class TrackNShare extends Component {
  render() {
    return (
      <View>
      <Test />
      <Text>
      Oh hello there
      </Text>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                alert("login has finished with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TrackNShare', () => TrackNShare);
