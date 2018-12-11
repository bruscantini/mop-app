import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import { auth } from 'firebase';
import FKTextInput from './FKTextInput';

const onSubmit = ({ email, password }) => {
  auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log('firebase: signup error. code: ', errorCode, ', message: ', errorMessage);
  });
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

const CustomerSignupForm = () => (
  <Formik
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
  />
);

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    margin: 10
  },
});

export default CustomerSignupForm;