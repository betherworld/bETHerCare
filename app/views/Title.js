import React, {Component} from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header } from 'native-base';

export default class Title extends Component<Props> {
  render() {
    return (<Header style={{backgroundColor: '#20b2aa', opacity: 0.7}}>
      <Text style={styles.headerText}>
        bETHer Care
      </Text>
    </Header>);
  }
}

const styles = StyleSheet.create({
  headerText: {
      color: 'white',
      fontSize: 28,
      textAlignVertical: 'center',
      textAlign: 'left',
      fontWeight: 'bold',
  }
});
