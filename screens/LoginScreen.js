import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { auth } from 'firebase';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { setAuthentication } from '../redux/reducer';
import colors from '../utils/colors';

const logo = require('../assets/broom.png');

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'MopApp',
    headerTitleContainerStyle: {
      justifyContent: 'center',
      backgroundColor: colors.darkPurple
    },
    headerTitleStyle: {
      color: colors.yellow
    }
  }

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
        <Image source={logo} />
        <TextInput
          style={styles.inputBox}
          placeholder='Username'
          placeholderTextColor={colors.yellow}
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        <TextInput
          style={styles.inputBox}
          placeholder='Password'
          placeholderTextColor={colors.yellow}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <Button
          style={styles.loginButton}
          styleDisabled={{ color: colors.red, backgroundColor: colors.black }}
          onPress={this.onSubmit.bind(this)}
        >
          Login
        </Button>
        <Text
          onPress={() => { this.props.navigation.navigate('Signup'); }}
          style={styles.signupText}
        >
          Don't have an account?
          <Text style={{ color: colors.yellow, fontWeight: 'bold' }}>  Signup</Text>
        </Text>
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
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  loginButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.yellow,
    backgroundColor: colors.yellow,
    color: colors.purple,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10
  },
  inputBox: {
    height: 60,
    margin: 10,
    alignSelf: 'stretch',
    color: colors.yellow,
    borderWidth: 2,
    borderColor: colors.yellow,
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
