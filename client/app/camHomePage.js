import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import { Container, Content, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC0SrkXiPruVpvsCBXV0Z5-thtKOC20U1E",
  authDomain: "https://awsomproject-7ab1b.firebaseio.com",
  storageBucket: "gs://awsomproject-7ab1b.appspot.com",
}
firebase.initializeApp(config)
const storage = firebase.storage()

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    //calling function that go to friends page and pass image url
    goToFriendMessage(uri);

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
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const goToFriendMessage = (dosom) => Actions.friendMessage({ text: dosom });

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
      { enableHighAccuracy: true,distanceFilter:1 ,timeout: 20000, maximumAge: 500}
    );
    var watchID = navigator.geolocation.watchPosition((position) => {
      //console.log(position)
      var lastPosition = position.coords.longitude//JSON.stringify(position);
      this.setState({ lastPosition });
      if (lastPosition.toString() == this.state.initialPosition) {
        console.log('yes')
        this.setState({ opacity: 1 });
      } else {
        console.log('no')
        this.setState({ opacity: 0 });
      }
    },
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: true,distanceFilter:1 ,timeout: 20000, maximumAge: 500}
    );
  }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }

  //location section 





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
              
<Icon name="rocket" size={30} color="#900" />

<Text 
style={styles.capture}
onPress={this.takePicture.bind(this)}>
<Icon active name='camera' />
</Text>

         
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
  takePicture() {
    this.camera.capture()
      .then((data) => uploadImage(data.path))
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
    backgroundColor:color="#1bb4ba",
    borderRadius: 25,
    color: '#000',
    padding: 10,
    margin: 40,
    width : 50,
    height : 50 ,
     alignItems: 'center'
  }
});