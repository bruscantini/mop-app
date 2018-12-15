import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../utils/colors';

class ChooseAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Address'
  }

  onAddButtonPress = () => {
    this.props.navigation.navigate('NewAddress');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text style={{ margin: 10 }}>
          {this.props.state.address.name ? (this.props.state.address.name + ': ') : null}
        </Text>
        <Text style={{ margin: 10 }}>
          {this.props.state.address.description ? this.props.state.address.description : null}
        </Text>
        <TouchableOpacity
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            backgroundColor: colors.white,
            borderRadius: 50,
            borderColor: colors.black,
            borderWidth: 1,
          }}
          onPress={this.onAddButtonPress}
        >
          <AntDesign name={'pluscircle'} size={99} color={colors.purple} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(ChooseAddressScreen);
