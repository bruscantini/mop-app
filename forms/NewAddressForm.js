import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import { auth } from 'firebase';
import FKTextInput from './FKTextInput';

const onSubmit = () => {

};

const validate = () => {

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
        <Text>Nickname</Text>
        <Field
          component={FKTextInput}
          name='nickName'
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

});

export default NewAddressForm;
