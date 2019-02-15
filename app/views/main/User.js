import React, {Component} from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';

export default class User extends Component<Props> {
  constructor(props) {
    super(props);

    this.SERVER = "http://7d4bd9be.ngrok.io";
    this.getUserData = this.getUserData.bind(this);

    this.state = {};
    this.getUserData();
  }

  getUserData() {
    fetch(`${this.SERVER}/api/user/${this.props.userKey}`).then(res => res.json()).then(res => {
      let next = Object.assign(this.state, res);
      this.setState(next);
    });
  }

  getFullName() {
    return this.state.info.firstName + ' '+  this.state.info.lastName;
  }

  render() {
    return (<ListItem numberOfLines={5}>
      <Body>
        <Text> {this.state.info ? this.getFullName() : ""}</Text>
        <Text note numberOfLines={1}> {this.state.info ? this.state.info.address : ""} </Text>
      </Body>

      <Right>
        <Button transparent>
          <Text style={{ color: "lightblue" }}>View</Text>
        </Button>
      </Right>
    </ListItem>);
  }
}
