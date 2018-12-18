import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

const FKPasswordInput = (props) => {
  const {
    field: {
      name,
      onBlur,
      onChange,
      value
    },
    form: {
      errors,
      touched,
    },
    placeholder
  } = props;
  return (
    <View
      style={styles.inputContainer}
    >
      <TextInput
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        style={[
          styles.inputField,
          {
            borderColor: errors[name] && touched[name] ? colors.red : colors.black,
            marginBottom: errors[name] && touched[name] ? 0 : 14
          },
        ]}
        value={value}
        placeholder={placeholder}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
      />
      {errors[name] && touched[name] &&
        <Text style={styles.rootError}>{errors[name]}</Text>}
    </View>
  );
};

FKPasswordInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 5,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
  },
  rootError: {
    color: colors.red,
    fontSize: 12
  }
});

export default FKPasswordInput;
