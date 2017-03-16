

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Body, ListItem, Text,Thumbnail, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    return (

      <Container>
        <Content>
          <Grid>
            <Row style={{
              backgroundColor: '#22c7e8', height: 392,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <Thumbnail style={{ width: 250, height: 250, borderRadius: 150 }}
                source={{ uri: this.props.text }}
                />
            </Row>
          </Grid>
               <ListItem>
           <CheckBox onPress={this.toggle.bind(this)} checked={this.state.checked}  />
             <Body>
               <Text>Saeed</Text>
             </Body>
           </ListItem>
               <ListItem>
           <CheckBox onChange ={(checked)=>alert("!checked")}  />
             <Body>
               <Text>Hasn</Text>
             </Body>
           </ListItem>
               <ListItem>
           <CheckBox onPress={this.toggle(this)}  />
             <Body>
               <Text>Noor</Text>
             </Body>
           </ListItem>
           <ListItem>
             <CheckBox checked={false} />
             <Body>
               <Text>Sajedah</Text>
             </Body>
           </ListItem>
        </Content>
              <Icon name='ic_check_black_24dp' />

      </Container>


     
      

      //   <Text onPress={Actions.camHomePage}>{this.props.text}</Text>
      // </View>
    );
  }
}