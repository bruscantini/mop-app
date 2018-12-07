import React from 'react';
import { Text, View, Button } from 'react-native';
import * as firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>Welcome to your Settings!</Text>
        <Button
          title="Sign out"
          onPress={() => {
            firebase.auth().signOut().then(() => {
              // Sign-out successful.
              this.props.navigation.replace('Login');
            }).catch((error) => {
              // An error happened.
            });
          }}
        />
      </View>
    );
  }
}
