/**
 * 导航设置页
 */
import React, { Component } from 'react';
import HomePage from './src/pages/home/HomePage';
import HomePageTest from './src/pages/home/HomePageTest';
import HomePageTest2 from './src/pages/home/HomePageTest2';
import HomePageTest3 from './src/pages/home/HomePageTest3';
import Poetry from './src/pages/poetry/Poetry';
import CultureMap from './src/pages/culture-map/CultureMap';
import PointDetail from './src/pages/culture-map/PointDetail';
import Person from './src/pages/culture-map/Person';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './src/redux/createStore';
import PoemDetail from "./src/pages/poetry/PoemDetail";
import SearchResult from "./src/pages/poetry/SearchResult";

import Game from './src/pages/game/Game';

const store = configureStore();

const RootStack = createStackNavigator(
    {
        Home: { screen: HomePageTest3 },
        Poetry:{ screen: Poetry },
        PoemDetail: {screen: PoemDetail},
        CultureMap:{ screen: CultureMap },
        PointDetail: { screen: PointDetail },
        Person: { screen: Person },
        Result: { screen: SearchResult },
        Game: { screen: Game }
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
