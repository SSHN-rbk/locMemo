

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class friendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: { origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } },
      opacity: 0,
    };
  }
  render() {
    return (
      <View style={{ margin: 128 }}>
        <Image
          style={{
            height: 200,//parseInt(this.state.bounds.size.height),
            width: 200,//parseInt(this.state.bounds.size.width),
            left: 20,//parseInt(this.state.bounds.origin.x),
            top: 100,//parseInt(this.state.bounds.origin.y),
            justifyContent: "center",
            alignItems: "center",
            resizeMode: 'stretch',
            position: 'absolute'
          }}
          source={{ uri: this.props.text }}
          />
        <Text onPress={Actions.camHomePage}>{this.props.text}</Text>
      </View>
    )
  }
}