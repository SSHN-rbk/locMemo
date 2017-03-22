import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import { Container, Content, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyC0SrkXiPruVpvsCBXV0Z5-thtKOC20U1E",
  authDomain: "https://awsomproject-7ab1b.firebaseio.com",
  //
  databaseURL: "https://awsomproject-7ab1b.firebaseio.com",
  //
  storageBucket: "gs://awsomproject-7ab1b.appspot.com",
}
export const App = firebase.initializeApp(config)
const storage = firebase.storage()
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
export let tempArray = [];
//const goToFriendMessage = (long) => Actions.friendMessage({ long:long });
export default class camHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: { origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } },
      opacity: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  }
  //location section 
  //watchID: ?number = null;
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position.coords.longitude//JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, distanceFilter: 1, timeout: 20000, maximumAge: 500 }
    );
    var watchID = navigator.geolocation.watchPosition((position) => {
      //console.log(position)
      var lastPosition = { Long: position.coords.longitude, att: position.coords.latitude };//position.coords.longitude//JSON.stringify(position);
      this.setState({ lastPosition });
      console.log(this.state.lastPosition)
      if (lastPosition.toString() == this.state.initialPosition) {
        console.log('yes')
        this.setState({ opacity: 1 });
      } else {
        console.log('no')
        this.setState({ opacity: 0 });
      }
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, distanceFilter: 1, timeout: 20000, maximumAge: 500 }
    );
  }
  uploadImage(uri, long, att, mime = 'image/jpeg') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const sessionId = new Date().getTime()
      let uploadBlob = null
      const imageRef = storage.ref('images').child(`${sessionId}`)
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          console.log(long)
          var that = this;
          App.database().ref('users').push({ url: url, l: long, a: att }).then(function () {
            that.goToFriendMessage(long, att)
          })
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  _pickImage() {
    this.setState({ uploadURL: '' })
    ImagePicker.launchImageLibrary({}, response => {
      uploadImage(response.uri)
        .then(url => this.setState({ uploadURL: url }))
        .catch(error => console.log(error))
    })
  }
  readQR(e) {
    //console.error(e);
    if (e.data) {
      if (e.data == 'Hello :)') {
        this.setState({ opacity: 1 });
      } else {
        this.setState({ opacity: 0 });
      }
      this.setState({ bounds: e, data: e.data });
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
          <Icon name="camera" size={100} onPress={this.goToFriendMessage.bind(this, this.state.lastPosition.Long, this.state.lastPosition.att)} />
          <Icon name="camera"
            size={100}
            color="#22c7e8"
            onPress={this.takePicture.bind(this, this.state.lastPosition)} />
          {
            (() => {
              switch (this.state.uploadURL) {
                case null:
                  return null
                case '':
                  return <ActivityIndicator />
                default:
                  return (
                    <View>
                      <Image
                        source={{ uri: this.state.uploadURL }}
                        style={styles.image}
                        />
                      <Text>{this.state.uploadURL}</Text>
                    </View>
                  )
              }
            })()
          }

          <Image
            style={{
              opacity: this.state.opacity,
              height: 50,//parseInt(this.state.bounds.size.height),
              width: 50,//parseInt(this.state.bounds.size.width),
              left: 50,//parseInt(this.state.bounds.origin.x),
              top: 50,//parseInt(this.state.bounds.origin.y),
              justifyContent: "center",
              alignItems: "center",
              resizeMode: 'stretch',
              position: 'absolute'
            }}
            source={require('./../assets/img/smiley.png')}
            />
        </Camera>
      </View>
    );
  }
  takePicture(location) {
    console.log(location)
    this.camera.capture()
      .then((data) => this.uploadImage(data.path, location.Long, location.att))
      .catch(err => console.error(err));
  }
  goToFriendMessage(long, att) { console.log('bef'), Actions.friendMessage({ long: long, att: att }), console.log('after') };
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height
  }
})