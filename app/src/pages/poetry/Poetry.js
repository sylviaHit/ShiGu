/**
 * homePage
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import { NavigationActions } from 'react-navigation';
import data from './data.json';

export default class Poetry extends Component {
    // 构造
    constructor() {
        super();
        this.data = data;
        this.onEventPress = this.onEventPress.bind(this);
    }

    onEventPress(data){
        const navigateAction = NavigationActions.navigate({
            routeName: 'PoemDetail',
            params: {id: data.id }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Timeline 
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          innerCircle={'dot'}
          options={{
            style:{paddingTop:5}
          }}
          onEventPress={this.onEventPress}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop: 10
  },
});