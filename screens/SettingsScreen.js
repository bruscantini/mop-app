import React from 'react';
import { Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { setAuthentication } from '../redux/reducer';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>Welcome to your Settings!</Text>
        <Text>Signed In: {JSON.stringify(this.props.state.isSignedIn)}</Text>
        <Button
          title="Sign out"
          onPress={() => {
            firebase.auth().signOut().then(() => {
              // Sign-out successful.
              // update State
              this.props.setAuthentication(false);

              this.props.navigation.replace('Login');
            }).catch((error) => {
              // An error happened.
              console.log('could not sign out. error: ', error);
            });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = {
  setAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
