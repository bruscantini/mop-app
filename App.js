import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React, { Component } from 'react';
import mopAppReducer from './redux/reducer';
import MainNavigator from './navigators/MainNavigator';

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
