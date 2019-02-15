import React, {Component} from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';
import { StackNavigator } from "react-navigation";

export default class User extends Component<Props> {
  constructor(props) {
    super(props);

    this.props.getUserData = this.getUserData.bind(this);

    this.state = {};
    this.getUserData();
  }

  getUserData() {
    fetch(`${this.props.server}/api/user/${this.props.userKey}`).then(res => res.json()).then(res => {
      let next = Object.assign(this.state, res);
      this.setState(next);
    });
  }

  getFullName() {
    return this.state.info.firstName + ' '+  this.state.info.lastName;
  }

  handlePress() {
    if (this.state.info && this.state.tid) {
      this.props.nav.navigate("Actions", {
        dev: this.state.tid,
        cli: this.props.me,
        srv: this.props.server,
      });
    } else {
      this.props.nav.navigate("Ledger", {
        cli: this.state.client,
        name: this.getFullName(),
        srv: this.props.server,
      });
    }
  }

  render() {
    return (<ListItem numberOfLines={5}>
      <Body>
        <Text> {this.state.info ? this.getFullName() : ""}</Text>
        <Text note numberOfLines={1}> {this.state.info ? this.state.info.address : ""} </Text>
      </Body>

      <Right>
        <Button transparent onPress={() => this.handlePress()}>
          <Text style={{ color: "lightblue" }}>View</Text>
        </Button>
      </Right>
    </ListItem>);
  }
}
