import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  MainFeed,
  Login,
  Register,
  Augment,
  Camera,
  Profile
} from './components/screens';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

const Tabs = createBottomTabNavigator({
  feed: MainFeed,
  ar: Augment,
  camera: Camera,
  profile: Profile
});

const IntroStack = createStackNavigator({
  login: Login,
  register: Register
});

const MainStack = createSwitchNavigator({
  login: IntroStack,
  main: Tabs
});

const AppContainer = createAppContainer(MainStack);

class InstaClone extends Component {
  render() {
    return <AppContainer />;
  }
}

export default InstaClone;
