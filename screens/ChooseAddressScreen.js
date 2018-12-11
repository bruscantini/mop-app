import React from 'react';
import { Text, View } from 'react-native';

export default class ChooseAddressScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>Choose where you want to clean!</Text>
      </View>
    );
  }
}
