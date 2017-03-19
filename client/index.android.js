import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import camHomePage from './app/camHomePage';
import friendMessage from './app/friendMessage';

export default class locMemo extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="camHomePage" component={camHomePage} title="camHomePage" initial={true} />
          <Scene key="friendMessage" component={friendMessage} title="friendMessage" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('locMemo', () => locMemo);
