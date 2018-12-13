import React from 'react';
import { Text, View } from 'react-native';

export default class OrdersScreen extends React.Component {
  static navigationOptions = {
    title: 'Orders'
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>You have no order history</Text>
      </View>
    );
  }
}
