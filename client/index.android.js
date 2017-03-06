/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';
import Camera from 'react-native-camera';

export default class CamerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: { origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } },
      opacity: 0,
    };
  }

  readQR(e) {
    //alert(e.size);
    if (e.data) {
      if (e.data == 'Hello :)') {
        this.setState({ opacity: 1 });
      } else {
        this.setState({ opacity: 0 });
      }
      //this.setState({ bounds: e, data: e.data });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          } }
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill} onBarCodeRead={this.readQR.bind(this)} >
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          <Image
            style={{
              opacity: this.state.opacity,
              height: 50, //parseInt(this.state.bounds.size.height),
              width: 50, //parseInt(this.state.bounds.size.width),
              left: 50, //parseInt(this.state.bounds.origin.x),
              top: 50, //parseInt(this.state.bounds.origin.y),
              justifyContent: "center",
              alignItems: "center",
              resizeMode: 'stretch',
              position: 'absolute'
            }}
            source={require('./assets/img/smiley.png')}
            />
        </Camera>
      </View>
    );
  }
  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('CamerApp', () => CamerApp);
