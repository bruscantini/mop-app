import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class BookingScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>You can't order at this time</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.isSignedIn };
};

export default connect(mapStateToProps, null)(BookingScreen);
