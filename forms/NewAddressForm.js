import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import FKTextInput from './FKTextInput';

const validate = ({ nickname }) => {
  const errors = {};
  if (nickname === undefined) {
    errors.nickname = 'Required';
  } else if (nickname.trim() === '') {
    errors.nickname = 'Must not be blank';
  }
};

const NewAddressForm = (props) => (
  <Formik
    onSubmit={props.onSubmit}
    validate={validate}
    render={({
      handleSubmit,
      isValid,
    }) => (
      <View>
        <Text style={styles.heading}>Nickname</Text>
        <Field
          component={FKTextInput}
          name='nickname'
          placeholder='e.g. Home'
        />
        <Button
          title="Save"
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

export default NewAddressForm;
