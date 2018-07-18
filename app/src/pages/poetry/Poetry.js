/**
 * homePage
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import { NavigationActions } from 'react-navigation';
import data from './data.json';
import {service} from "../../utils/service";

export default class Poetry extends Component {
    // 构造
    constructor() {
        super();
        this.data = data;
        this.onEventPress = this.onEventPress.bind(this);
    }

    onEventPress(data){
        // const navigateAction = NavigationActions.navigate({
        //     routeName: 'PoemDetail',
        //     params: {id: data.id }
        // });
        // this.props.navigation.dispatch(navigateAction);
        this.getPoemDetail(data.id);
    }


    getPoemDetail = (id) => {
        let me = this;
        service.get('https://api.sou-yun.com/api/poem', {key: id, jsonType: true}).then((response) => {
            if (response.ShiData && response.ShiData.length > 0) {
                console.log(response,'1111111');

                const navigateAction = NavigationActions.navigate({
                    routeName: 'PoemDetail',
                    params: {
                        id: response.ShiData[0].Id,
                        data: response.ShiData[0]
                    }
                });
                this.props.navigation.dispatch(navigateAction);


                // let data = response.ShiData[0];
                // let title = data.Title.Content;
                // let subTitle = '（' + data.Dynasty + '.' + data.Author + '）';
                // let preface = data.Preface;
                // let content = '';
                // if(data.Clauses && data.Clauses.length>0){
                //     data.Clauses.forEach((item,index)=>{
                //         if(index%2 == 1){
                //             content += item.Content + '\n';
                //         }else{
                //             content += item.Content;
                //         }
                //
                //     });
                // }
                // me.setState({title: title, preface: preface,content: content,subTitle: subTitle});
            }
        });
    };

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
          timeContainerStyle={{minWidth:52}}
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
    // paddingRight: 20,
    paddingBottom: 20,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop: 10
  },
});
