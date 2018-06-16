/**
 * homePage
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import data from './data.json';

export default class Poetry extends Component {
    // 构造
    constructor() {
        super();
        this.data = data;
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
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
        paddingTop:15,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
  },
});