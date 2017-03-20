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
import { Container, Content, Body, ListItem, Text,Thumbnail, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'
import {App} from './camHomePage'
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
      checked:false,
      bounds: { origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } },
      opacity: 0
    };
  }
  componentDidMount() {
    var that = this.props.long

    console.log(this.props.long)

    ref.orderByChild("a").equalTo(31.9722852).once('value', function(snap) {
     var i = 0;
     snap.forEach(function(userSnap) {
      console.log('user %s is in position %d with %d points', userSnap.key, i++, userSnap.val());
      if(userSnap.val().l === that)
        tempArray.push(userSnap.val().url)
    });
     console.log(tempArray);
   });


  }


  toggle(obj) {
    alert(obj.checked)
        //this.setState({checked: !this.state.checked});
      }

      render() {
        let LinearGradient = <View style={{ position:'absolute', top:0, left:0, width: width, height:width, backgroundColor: 'rgba(100, 97, 67, .7)' }} />

        return (

          <View style={{ flex:1, backgroundColor: 'transparent' }}>
          <View>
          <Image style={{ height: width, width: width, position: 'absolute', top:0, left:0 }} source={{ uri: 'http://i01.i.aliimg.com/wsphoto/v0/32297951629_5/5pcs-lot-The-Hollowan-Star-Nicolas-Cage-Stylish-Square-Pillowcase-Cushion-Pillow-Cover.jpg' }} />
          { LinearGradient }
          </View>
          <ScrollView style={{ flex:1 }}>
          <View style={{ marginTop:320 }}>


        <Image
          style={{
          height: 250,//parseInt(this.state.bounds.size.height),
          width: 250,//parseInt(this.state.bounds.size.width),
        }}
        source={require('./../assets/img/smiley.png')}
        />

        <Image
        style={{
          height: 250,//parseInt(this.state.bounds.size.height),
          width: 250,//parseInt(this.state.bounds.size.width),
        }}
        source={require('./../assets/img/smiley.png')}
        />

        <Image
        style={{
          height: 250,//parseInt(this.state.bounds.size.height),
          width: 250,//parseInt(this.state.bounds.size.width),
        }}
        source={require('./../assets/img/smiley.png')}
        />


        </View>
        </ScrollView>
        </View>
      // <Container>
      //   <Content>
      //     <Grid>
      //       <Row style={{
      //         backgroundColor: '#22c7e8', height: 392,
      //         justifyContent: 'center', alignItems: 'center'
      //       }}>
      //         <Thumbnail style={{ width: 250, height: 250, borderRadius: 150 }}
      //           source={{ uri: this.props.text }}
      //           />
      //       </Row>
      //     </Grid>
      //          <ListItem>
      //      <CheckBox onPress={this.toggle.bind(this)} checked={this.state.checked}  />
      //        <Body>
      //          <Text>Saeed</Text>
      //        </Body>
      //      </ListItem>
      //          <ListItem>
      //      <CheckBox onChange ={(checked)=>alert("!checked")}  />
      //        <Body>
      //          <Text>Hasn</Text>
      //        </Body>
      //      </ListItem>
      //          <ListItem>
      //      <CheckBox onPress={this.toggle(this)}  />
      //        <Body>
      //          <Text>Noor</Text>
      //        </Body>
      //      </ListItem>
      //      <ListItem>
      //        <CheckBox checked={false} />
      //        <Body>
      //          <Text>Sajedah</Text>
      //        </Body>
      //      </ListItem>
      //   </Content>
      //         <Icon name='ic_check_black_24dp' />

      // </Container>



      

      // //   <Text onPress={Actions.camHomePage}>{this.props.text}</Text>
      // // </View>
      );
      }
    }
    


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



    let ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 