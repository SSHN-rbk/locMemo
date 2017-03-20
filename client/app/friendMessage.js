

import React, { Component } from 'react';
import { View, Image,StyleSheet,
  Dimensions,
  ScrollView,
   } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Body, ListItem, Text,Thumbnail, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';


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
                            <Text>{ipsum}</Text>
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



let ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
