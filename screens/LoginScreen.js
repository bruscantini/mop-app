import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button } from 'react-native';
import { auth } from 'firebase';

import { connect } from 'react-redux';
import { setAuthentication } from '../redux/reducer';


class LoginScreen extends Component {

  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    const authStateChangeCallback = (user) => {
      if (user) {
        // User is signed in.
        console.log('user was successfully signed in');

        // update State
        this.props.setAuthentication(true);

        this.props.navigation.replace('Home');
        unsubscribe();
      } else {
        // No user is signed in.
        console.log('user not signed in.');
      }
    };
    const unsubscribe = auth().onAuthStateChanged(authStateChangeCallback);
  }

  onSubmit() {
    const { username, password } = this.state;
    auth().signInWithEmailAndPassword(username, password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('in LoginScreen submit. error: ', { errorCode, errorMessage });
      // ...
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>
          Login
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder='Username'
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          style={styles.inputBox}
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button onPress={this.onSubmit.bind(this)} title='Login' />
        <Text
          onPress={() => { this.props.navigation.navigate('Signup'); }}
          style={styles.signupText}
        >
          Don't have an account? Signup.
        </Text>
        <Text>Signed in: {JSON.stringify(this.props.state.isSignedIn)}</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = {
  setAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  inputBox: {
    height: 60,
    margin: 10,
    alignSelf: 'stretch',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10
  },
  heading: {
    fontSize: 20
  },
  signupText: {
    paddingTop: 20
  }
});
