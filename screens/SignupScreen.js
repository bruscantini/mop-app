import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import CustomerSignupForm from '../forms/CustomerSignupForm';

const colors = {
  purple: '#7a44cf',
  white: '#fff',
  black: 'black'
};

export default class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Signup'
  }

  state = {
    formVersion: 0
  }

  renderCurrentForm = () => {
    const forms = [
      <CustomerSignupForm />,
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
