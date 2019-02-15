import React, {Component} from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Header, Content, List, ListItem } from 'native-base';

import User from './User';
import Title from './Title';

export default class HomeScreen extends Component<Props> {
    constructor(props) {
      super(props);

      this.SERVER = "http://7d4bd9be.ngrok.io";
      this.getUsers = this.getUsers.bind(this);

      this.state = {
        clients : [],
        devices : []
      };

      this.getUsers();
    }

    getUsers() {
      fetch(`${this.SERVER}/api/users`).then(res => res.json()).then(res => {
        this.setState({
          clients : res.clients,
          devices : res.devices
        });
      });
    }

    render() {
      let clients = this.state.clients.map(item => <User userKey={item} nav={this.props.navigation}/>);
      let devices = this.state.devices.map(item => <User userKey={item} nav={this.props.navigation}/>);

      return (<Container>
        <Title/>

        <ListItem itemDevider style={{fontSize: 24}}>
            <Text>Donors</Text>
        </ListItem>

        <Content>
          {clients}
        </Content>

        <ListItem itemDevider style={{fontSize: 24}}>
            <Text>Receivers</Text>
        </ListItem>

        <Content>
          {devices}
        </Content>
      </Container>
      );
    }
}
