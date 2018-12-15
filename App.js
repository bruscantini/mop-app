import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';
import { firebaseConfig } from './Api';
import mopAppReducer from './redux/reducer';
import MainNavigator from './navigators/MainNavigator';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Create redux store
const store = createStore(mopAppReducer);

const NavigatorContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorContainer />
      </Provider>
    );
  }
}
