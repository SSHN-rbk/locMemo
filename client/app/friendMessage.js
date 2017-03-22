import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Body, ListItem, Text, Thumbnail, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'
import { App } from './camHomePage'
import Gallery from 'react-native-gallery';
const tempArray = []
const config = {
  apiKey: "AIzaSyC0SrkXiPruVpvsCBXV0Z5-thtKOC20U1E",
  authDomain: "https://awsomproject-7ab1b.firebaseio.com",
  //
  databaseURL: "https://awsomproject-7ab1b.firebaseio.com",
  //
  storageBucket: "gs://awsomproject-7ab1b.appspot.com",
}
// const App = firebase.initializeApp(config)
const storage = firebase.storage()
const ref = App.database().ref('users')
let width = Dimensions.get('window').width
export default class friendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      bounds: { origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } },
      opacity: 0
    };
  }
  componentDidMount() {
    var long = this.props.long
    var att = this.props.att
    console.log('this.props.long')
    console.log(this.props.long)
    ref.orderByChild("a").equalTo(att).once('value', function (snap) {
      var i = 0;
      console.log('sdfsdfsdfsdf')
      snap.forEach(function (userSnap) {
        console.log('user %s is in position %d with %d points', userSnap.key, i++, userSnap.val());
        if (userSnap.val().l === long)
          tempArray.push(userSnap.val().url)
      });
      console.log(tempArray);
    });

  }
  render() {
    return (
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={tempArray}

        />
    );
  }
}
// render() {
//   let LinearGradient = <View style={{ position:'absolute', top:0, left:0, width: width, height:width, backgroundColor: 'rgba(100, 97, 67, .7)' }} />
//     const lapsList = tempArray.map((data) => {
//       return (
//           <Image
//       style={{
//           height: 250,//parseInt(this.state.bounds.size.height),
//           width: 250,//parseInt(this.state.bounds.size.width),
//           left: 50,//parseInt(this.state.bounds.origin.x),
//           top: 50,//parseInt(this.state.bounds.origin.y),
//           justifyContent: "center"
//         }}
//         source={{uri: "https://firebasestorage.googleapis.com/v0/b/awsomproject-7ab1b.appspot.com/o/images%2F1490172366062?alt=media&token=b3755362-0db3-45f6-85c7-856f5267dd72"}}
//         />
//         )
//     })
//     return (
//       <View style={{ flex:1, backgroundColor: 'transparent' }}>
//       <View>
//       <Image style={{ height: width, width: width, position: 'absolute', top:0, left:0 }} source={{ uri: 'http://i01.i.aliimg.com/wsphoto/v0/32297951629_5/5pcs-lot-The-Hollowan-Star-Nicolas-Cage-Stylish-Square-Pillowcase-Cushion-Pillow-Cover.jpg' }} />
//       </View>
//       <ScrollView style={{ flex:1 }}>
//       <View style={{ marginTop:320 }}>
//        { lapsList }


//         </View>
//         </ScrollView>
//         </View>
//       )
//   }
// }
// render() {
//   const lapsList = tempArray.map((data) => {
//     return (
//       <View><Text>{data}</Text></View>
//       )
//   })
//   return (
//     <View style={styles.container}>
//     <View style={styles.footer}>
//     <View><Text>coucou test</Text></View>
//     {lapsList}
//     </View>
//     </View>
//     )
// }
//   render() {
//     return(
// <View>
//   {tempArray.map(function(element){
//    return <Image source={{uri:element}}
//       style={{
//       height: 50,//parseInt(this.state.bounds.size.height),
//       width: 50,//parseInt(this.state.bounds.size.width),
//       left: 50,//parseInt(this.state.bounds.origin.x),
//       top: 50,//parseInt(this.state.bounds.origin.y),
//       justifyContent: "center"
//     }}
//     />;
//               })}
//         </View>
//   )}
//}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 19,
    marginBottom: 5,
  },
})
