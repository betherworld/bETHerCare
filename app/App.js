/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { Container, Header, Content, List, ListItem, Col, Row, Grid, DatePicker } from 'native-base';

function msToHMS( ms ) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return( hours + ":" + minutes + ":" + seconds);
}

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = { startDate: new Date(), endDate: new Date() };
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
    }
    setStartDate(newDate) {
        this.setState({ startDate: newDate, endDate: this.state.endDate });
    }
    setEndDate(newDate) {
        this.setState({ startDate: this.state.startDate, endDate: newDate });
    }

    render() {
        var transactions = require('./transactions.json').transactions;
        var users = require('./users.json').users;
        var actions = [];

        for(var i = 0; i<transactions.length; i++) {
            // find name of user with that id
            var u_name = '';
            for(var j = 0; j<users.length; j++) {
                if(users[j].public_key == transactions[i].receiver) {
                    //console.error(transactions[i]);
                    u_name = users[j].info[1];
                    break;
                }
            }
            actions.push({name: u_name, what: transactions[i].service, hours: msToHMS(transactions[i].end - transactions[i].begin)});
        }

        return (
            <Container>
                <Header><Text style={styles.headerText}>bETHer Care</Text></Header>
                <Grid>
                    <Row style={{height: 60}}>
                        <Col style={{ backgroundColor: '#ECECEC'}}>
                            <Text>From: </Text>
                            <DatePicker
                                defaultDate={this.state.startDate}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={"de"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                //placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setStartDate}
                                disabled={false} />
                        </Col>
                        <Col style={{ backgroundColor: '#ECECEC'}}>
                            <Text>To: </Text>
                            <DatePicker
                                defaultDate={this.state.endDate}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={"de"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                //placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setEndDate}
                                disabled={false} />
                        </Col>
                    </Row>
                    <Row>
                        <Content>
                            <FlatList
                                data = { actions }
                                renderItem={({item}) =>
                                    <ListItem>
                                        <Grid>
                                            <Col><Text>{item.name}</Text></Col>
                                            <Col><Text>{item.what}</Text></Col>
                                            <Col><Text>{item.hours}h</Text></Col>
                                        </Grid>
                                    </ListItem>}
                            />
                        </Content>
                    </Row>
                 </Grid>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headerText: {
      color: 'white',
      fontSize: 24,
      textAlignVertical: 'center',
      textAlign: 'left',
  },
});
