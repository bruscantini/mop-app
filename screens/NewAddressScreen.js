import React from 'react';
import { Text, View } from 'react-native';

export default class NewAddressScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>Add a new address!</Text>
      </View>
    );
  }
}
