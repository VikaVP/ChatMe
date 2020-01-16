import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import Start from './src/screens/Start';
import Register from './src/screens/Register';
import Chat from './src/screens/Chat';
import MyProfile from './src/screens/MyProfile';
const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: Splash,
    },
    Start: {
      screen: Start,
    },
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Chat: {
      screen: Chat,
    },
    MyProfile: {
      screen: MyProfile,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: 'false',
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);
function Root() {
  return <AppContainer />;
}
export default Root;
