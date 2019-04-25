/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InstaClone from './src/InstaClone.js';

import { Provider } from 'react-redux';

//store
import store from './store/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InstaClone />
      </Provider>
    );
  }
}
