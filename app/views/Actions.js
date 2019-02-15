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
      name: 'Walk dog',
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
      name: 'Visit doctor',
      num: 7,
  },
  {
      name: 'Wash the dishes',
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
      name: 'Picking up',
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

    render() {
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
                        <Button block onPress={() => alert('Yey!')}>
                            <Text style={{color: 'white'}}>Sign</Text>
                        </Button>
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }
}
