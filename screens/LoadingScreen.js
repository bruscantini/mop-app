import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../utils/colors';

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    // this.props.loadAssets();
  }
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.purple
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
