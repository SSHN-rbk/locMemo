import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform,TouchableHighlight,
  Image,
  ActivityIndicator,
  Animated
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
  //
  databaseURL: "https://awsomproject-7ab1b.firebaseio.com",
   //
   storageBucket: "gs://awsomproject-7ab1b.appspot.com",
 }
 export const App = firebase.initializeApp(config)
 const storage = firebase.storage()
 const ref = App.database().ref('users')
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
export let  tempArray=[];
//const goToFriendMessage = (long) => Actions.friendMessage({ long:long });
export default class camHomePage extends Component {
  // mixins: [TimerMixin],
  constructor(props) {
    super(props);
    this.state = {
      bounds: { origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } },
      opacity: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      bounceValue: new Animated.Value(10),
    };
  }
  //location section 
  watchID: ?number = null;
  componentDidMount() {
    var that= this;
  //     setTimeout( () => {
  //    this.setImage();
  //    this.state.bounceValue.setValue(1.5);     // Start large
  //   Animated.spring(                          // Base: spring, decay, timing
  //     this.state.bounceValue,                 // Animate `bounceValue`
  //     {
  //       toValue: 0.8,                         // Animate to smaller size
  //       friction: 1,                          // Bouncier spring
  //     }
  //   ).start();     
  // },1000);
    navigator.geolocation.getCurrentPosition(
      (position) => {
          var initialPosition = position.coords.longitude//JSON.stringify(position);
          this.setState({ initialPosition });
  },
  (error) => console.log(JSON.stringify(error)),
    { enableHighAccuracy: true,distanceFilter:1 ,timeout: 20000, maximumAge: 500}
    );

  watchID = navigator.geolocation.watchPosition((position) => {
        //console.log(position)
        var lastPosition = {Long:position.coords.longitude, att:position.coords.latitude};//position.coords.longitude//JSON.stringify(position);
        this.setState({ lastPosition })
        console.log(this.state.lastPosition)
        console.log(lastPosition)

        ref.orderByChild("a").equalTo(lastPosition.att).once('value', function (snap) {
    var i = 0;
    console.log('sdfsdfsdfsdf')
  snap.forEach(function (userSnap) {
    console.log('user %s is in position %d with %d points', userSnap.key, i++, userSnap.val());
    if (userSnap.val().l === lastPosition.Long)
      tempArray.push(userSnap.val().url)
  });
  if(tempArray.length === 0) {
    that.setState({opacity: 0})
  } else {
    that.setState({opacity: 1})
       that.state.bounceValue.setValue(1.5);     // Start large
    Animated.spring(                          // Base: spring, decay, timing
      that.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.8,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();   
  }
console.log(tempArray);
});
        
 
  },
  (error) => console.log(JSON.stringify(error)),
    { enableHighAccuracy: true,distanceFilter:1 ,timeout: 20000, maximumAge: 500}
    )

  
}

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

uploadImage (uri,mime = 'image/jpeg')  {
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
  var that = this;
  App.database().ref('users').push({url: url,l:this.state.lastPosition.Long,a:this.state.lastPosition.att}).then(function(){
    that.goToFriendMessage()
  })
  resolve(url)
})
.catch((error) => {
  reject(error)
})
})
}
setImage() {
   this.setState({opacity: 1});
}

render() {
  return (
    <View style={styles.container}>
    <Camera 
    ref={(cam) => {
      this.camera = cam;
    } }
    style={styles.preview}
    >

      <TouchableHighlight onPress={this.goToFriendMessage.bind(this)}>

        <Animated.Image
    style={{
          transform: [                        // `transform` is an ordered array
            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
          ],
          height:500,
          width:500,
           opacity: this.state.opacity,
        }}
        source={require('./../assets/img/pin2.png')}
        />
        </TouchableHighlight>

          <Icon name="camera" size={100}  onPress={this.takePicture.bind(this)}  />

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

          </Camera>
          </View>
          );
}
takePicture() {
  console.log('batataaaaa')
  this.camera.capture()
  .then((data) => this.uploadImage(data.path))
  .catch(err => console.error(err));
}
goToFriendMessage () {
  
  console.log('here')

            Actions.friendMessage({ imageArray:tempArray });

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
            height: Dimensions.get('window').height
          }
        })