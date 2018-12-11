import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { firebaseConfig } from './Api';
import mopAppReducer from './redux/reducer';
import MainNavigator from './navigators/MainNavigator';


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
