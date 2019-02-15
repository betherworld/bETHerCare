import React, {Component} from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Button } from 'native-base';
import { StackNavigator } from "react-navigation";
import Title from './Title';

export default class LedgerScreen extends Component<Props> {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.state = {
      durations: []
    };
  }

  update(cli, srv) {
    fetch(`${srv}/api/duration/${cli}`).then(res => res.json()).then(res => {
      this.setState({
        durations: res.durations
      });
    });
  }

  render() {
    const cli = this.props.navigation.getParam('cli', null);
    const srv = this.props.navigation.getParam('srv', null);
    const name = this.props.navigation.getParam('name', null);

    this.update(cli, srv);
    let views = this.state.durations.map(entry => (<ListItem numberOfLines={5}>
      <Body>
        <Text> Start({entry.begin}), End({entry.end}) </Text>
        <Text note numberOfLines={1}> {entry.info.service} </Text>
      </Body>
    </ListItem>));

    return (<Container>
      <Title/>

      <ListItem itemDevider style={{fontSize: 24}}>
          <Text>Transactions for: {name}</Text>
      </ListItem>

      <Content>
        {views}
      </Content>
    </Container>);
  }
}
