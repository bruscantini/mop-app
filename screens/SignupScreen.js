import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, Alert } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { auth } from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomerSignupForm from '../forms/CustomerSignupForm';
import colors from '../utils/colors';

export default class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup'
  }
  state = {
    formVersion: 0
  }
  onSubmit = ({ firstName, lastName, email, password }, actions) => {
    actions.setSubmitting(true);
    auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      userCredential.user.updateProfile({ displayName: `${firstName} ${lastName}` });
      actions.setSubmitting(false);
      this.props.navigation.popToTop();
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('firebase: signup error. code: ', errorCode, ', message: ', errorMessage);
      Alert.alert(
        'Signup Error',
        error.message,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed in SignupError alert.') },
        ]
      );
      actions.setSubmitting(false);
    });
  };
  renderCurrentForm = () => {
    const forms = [
      <CustomerSignupForm onSubmit={this.onSubmit} />,
      (<Text style={styles.heading}>
        Cleaner Form ...
      </Text>)
    ];
    return forms[this.state.formVersion];
  }

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid scrollEnabled>
      <ScrollView contentContainerStyle={styles.screenContainer}>
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
                  customIcon:
                    <AntDesign
                      name="user"
                      size={32}
                      color={[colors.white, colors.black][this.state.formVersion]}
                    />
                },
                {
                  label: 'Cleaner',
                  value: 1,
                  customIcon:
                    <MaterialCommunityIcons
                      name="broom"
                      size={32}
                      color={[colors.black, colors.white][this.state.formVersion]}
                    />
                }
            ]}
          />
          {this.renderCurrentForm()}
      </ScrollView>
      </ KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    margin: 10
  },
});
