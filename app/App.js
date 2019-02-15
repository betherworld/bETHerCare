import React, {Component} from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Header, Content, List, ListItem } from 'native-base';
import { StackNavigator } from 'react-navigation';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './views/Home';
import ActionsScreen from './views/Actions';

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Actions: ActionsScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                // You can return any component that you like here!
                return (<Text>▼</Text>);
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(TabNavigator);
