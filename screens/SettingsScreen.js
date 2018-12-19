import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { auth } from 'firebase';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import { setAuthentication } from '../redux/reducer';
import colors from '../utils/colors';

class SettingsScreen extends React.Component {
  state = {
    displayName: '',
  }
  componentDidMount() {
    const displayName = this.props.state.authentication.user.displayName;
    this.setState({ displayName });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Text>Welcome to your Settings!</Text>
        <Text>{this.state.displayName}</Text>
        <Button
          style={styles.signoutButton}
          onPress={() => {
            auth().signOut().then(() => {
              // update State
              this.props.setAuthentication(false);
              this.props.navigation.replace('Login');
            }).catch((error) => {
              console.log('could not sign out. error: ', error);
            });
          }}
        >
          Sign Out
        </Button>
        <Button
          title="Sign out"
          onPress={() => {
            auth().signOut().then(() => {
              // update State
              this.props.setAuthentication(false);
              this.props.navigation.replace('Login');
            }).catch((error) => {
              console.log('could not sign out. error: ', error);
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signoutButton: {
    backgroundColor: colors.yellow,
    color: colors.purple,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.purple
  }
});

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = {
  setAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
