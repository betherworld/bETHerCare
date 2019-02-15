import React, {Component} from 'react';
import { StyleSheet, FlatList, Text, View, Platform, Switch } from 'react-native';
import { Container, Header, Content, List, ListItem, Col, Row, Grid, DatePicker, Left, Body, Right, CheckBox, Button, Card, CardItem } from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Title from './Title';

let allActions = [
  {
      name: 'Brush',
      num: 0,
  },
  {
      name: 'Cook',
      num: 1,
  },
  {
      name: 'Bake',
      num: 2,
  },
  {
      name: 'Walk',
      num: 3,
  },
  {
      name: 'Skydiving',
      num: 4,
  },
  {
      name: 'Rockclimbing',
      num: 5,
  },
  {
      name: 'Gliding',
      num: 6,
  },
  {
      name: 'Doctor',
      num: 7,
  },
  {
      name: 'Wash',
      num: 8,
  },
  {
      name: 'Running',
      num: 9,
  },
  {
      name: 'Chores',
      num: 10,
  },
  {
      name: 'Pickup',
      num: 11,
  },
];

export default class ActionsScreen extends Component {
    constructor(props) {
        super(props);
        selectedBoxes = [];
        for(var i = 0; i<allActions.length; i++) {
            selectedBoxes.push(false);
        }
        this.state = { boxesChecked : selectedBoxes };

        this.onPress = this.onPress.bind(this);
    }

    onPress(i) {
        var arr = this.state.boxesChecked;
        arr[i.num] = !arr[i.num];
        this.setState({ boxesChecked: arr });
    }

    checked() {
      let actions = "";
      for (let i = 0; i < 12; ++i) {
        if (this.state.boxesChecked[i]) {
          actions += allActions[i].name + ',';
        }
      }
      return actions;
    }

    sign(srv, cli, dev) {
      let resource = `${srv}/api/sign/${cli}/${dev}/${this.checked()}`;
      fetch(resource).then(res => res.json()).then(res => {
        // We should put it on the chain, but we didn't have time to implement it
        alert(res['ok'] ? "Transcation done" : "Transaction failed");
      });
    }

    render() {
        const dev = this.props.navigation.getParam('dev', null);
        const cli = this.props.navigation.getParam('cli', null);
        const srv = this.props.navigation.getParam('srv', null);

        return (
            <Container>
                <Title/>
                <Grid>
                    <Row size={9}>
                        <Content>
                            <FlatList
                                data = { allActions }
                                extraData = {this.state}
                                renderItem={({item}) =>
                                    <ListItem onPress={() => this.onPress(item)}>
                                        <Grid>
                                            <Col size={1}><CheckBox checked={this.state.boxesChecked[item.num]}/></Col>
                                            <Col size={9}><Text>{item.name}</Text></Col>
                                        </Grid>
                                    </ListItem>}
                            />
                        </Content>
                    </Row>
                    <Row size={1}>
                        <Content style={{paddingBottom: 20, paddingLeft: 10, paddingRight: 10}}>
                        <Button block onPress={() => this.sign(srv, cli, dev)}>
                            <Text style={{color: 'white'}}>Sign</Text>
                        </Button>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}
