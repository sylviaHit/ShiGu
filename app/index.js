/**
 * 导航设置页
 */
import React, { Component } from 'react';
import HomePage from './src/pages/home/HomePage';
import Poetry from './src/pages/poetry/Poetry';
import CultureMap from './src/pages/culture-map/CultureMap';
import PointDetail from './src/pages/culture-map/PointDetail';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/redux/createStore';

const store = configureStore();

const RootStack = createStackNavigator(
    {
        Home: { screen: HomePage },
        Poetry:{ screen: Poetry },
        CultureMap:{ screen: CultureMap },
        PointDetail: { screen: PointDetail },
    },
    {
        initialRouteName: 'Home',
        mode: 'modal',
        // headerMode: 'none',
    }
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        );
    }
}
