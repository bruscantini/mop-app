import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class ChooseAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Address'
  }

  onAddButtonPress = () => {
    this.props.navigation.navigate('NewAddress');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            backgroundColor: '#fff',
            borderRadius: 50,
            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={this.onAddButtonPress}
        >
          <AntDesign name={'pluscircle'} size={99} color='#7a44cf' />
        </TouchableOpacity>
      </View>
    );
  }
}
