import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { Formik, Field } from 'formik';
import * as firebase from 'firebase';
import { firebaseConfig } from '../Api';
import FKTextInput from '../FKTextInput';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const colors = {
  purple: '#7a44cf',
  white: '#fff'
};

const validate = ({ firstName, lastName, zip, email, password, confirmPassword }) => {
  const errors = {};
  const emailRegex = /^\w+@\w+.\w+$/;
  if (firstName === undefined) {
    errors.firstName = 'Required';
  } else if (firstName.trim() === '') {
    errors.firstName = 'Must not be blank';
  }
  if (lastName === undefined) {
    errors.lastName = 'Required';
  } else if (lastName.trim() === '') {
    errors.lastName = 'Must not be blank';
  }
  if (email === undefined) {
    errors.email = 'Required';
  } else if (email.trim() === '') {
    errors.email = 'Must not be blank';
  } else if (!emailRegex.test(email)) {
    errors.email = 'must be a valid email address';
  }
  if (!password || (password !== confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  if (zip && !/\d{5}/.test(zip)) {
    errors.zip = 'zip code must be 5 digits';
  }
  return errors;
};

const onSubmit = ({ email, password }) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log('firebase: signup error. code: ', errorCode, ', message: ', errorMessage);
  });
};

export default class SignupScreen extends Component {
  state = {
    formVersion: 0
  }

  renderCurrentForm = () => {
    const forms = [
      (<Formik
        onSubmit={onSubmit}
        validate={validate}
        render={({
          handleSubmit,
          isValid,
        }) => (
          <View>
            <Text style={styles.heading}>
              User Information
            </Text>
            <Field
              component={FKTextInput}
              name="firstName"
            />
            <Field
              component={FKTextInput}
              name="lastName"
            />
            <Field
              component={FKTextInput}
              name="email"
              autoCapitalize='none'
              autoCorrect={false}
            />
            <Field
              component={FKTextInput}
              name="zip"
            />
            <Field
              component={FKTextInput}
              name="password"
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
            />
            <Field
              component={FKTextInput}
              name="confirmPassword"
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
            />
            <Button
              title="Sign up"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      />),
      (<Text style={styles.heading}>
        Cleaner Form ...
      </Text>)
    ];
    return forms[this.state.formVersion];
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.heading}>
            Sign up as a ...
          </Text>
          <SwitchSelector
            initial={this.state.formVersion}
            onPress={value => this.setState({ formVersion: value })}
            textColor={colors.purple}
            selectedColor={colors.white}
            buttonColor={colors.purple}
            borderColor={colors.purple}
            hasPadding
            options={[
                {
                  label: 'Customer',
                  value: 0,
                  customIcon: <AntDesign name="user" size={32} color="black" />
                },
                {
                  label: 'Cleaner',
                  value: 1,
                  customIcon: <MaterialCommunityIcons name="broom" size={32} color="black" />
                }
            ]}
          />
        </View>
        <View style={{ flex: 3 }}>
          {this.renderCurrentForm()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, padding: 40
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    margin: 10
  },
});
