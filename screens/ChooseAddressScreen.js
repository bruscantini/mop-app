import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { CardViewWithIcon } from 'react-native-simple-card-view';
import colors from '../utils/colors';

const miniCardStyle = {shadowColor: '#000000', shadowOffsetWidth: 2, shadowOffsetHeight: 2, shadowOpacity: 0.1, shadowRadius: 5, backgroundColor: '#ffffff', padding: 5, margin: 5, borderRadius: 3, elevation: 3, width: (Dimensions.get('window').width * (3 / 4)) - 10 };

function showCard() {
  return (
  <CardViewWithIcon
    withBackground={false}
    androidIcon={ 'ios-home' }
    iosIcon={ 'ios-home' }
    iconHeight={ 30 }
    iconColor={ '#333' }
    title={ this.props.state.address.name }
    contentFontSize={ 20 }
    titleFontSize={ 12 }
    style={ miniCardStyle }
    content={ this.props.state.address.description }
    onPress={ () => this.setState({
             github: this.state.github + 1
    })}
  />
)
}

class ChooseAddressScreen extends React.Component {
  static navigationOptions = {
    title: 'Select Address'
  }

  onAddButtonPress = () => {
    this.props.navigation.navigate('NewAddress');
  }

  state = {
    github: 0
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 40 }}>
        <View style={{ alignItems: 'center', flexWrap: 'wrap', paddingBottom: 20 }}>
          {this.props.state.address.name ? showCard.bind(this)() : null}
        </View>
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
