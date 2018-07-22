/**
 * homePage
 */
import React, { Component } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { NavigationActions } from 'react-navigation';
import data from './data.json';
import {service} from "../../utils/service";
import RadioModal from 'react-native-radio-master';

export default class Search extends Component {
    // 构造
    constructor() {
        super();
        this.data = data;
        this.onEventPress = this.onEventPress.bind(this);
    }

    onEventPress(data){
        const navigateAction = NavigationActions.navigate({
            routeName: 'PoemDetail',
            params: {id: data.id },
            showValue: '',
            initId: 'All'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    /**
     * 搜索内容改变
     */
    onChangeText=(inputData)=>{
        this.setState({showValue: inputData});
    }

    /**
     * 跳转到搜索页
     */
    showData=()=>{
        let me = this;
        console.log('me', me, me.state.initId);

        service.get('https://api.sou-yun.com/api/poem', {key: this.state.showValue, scope: this.state.initId, jsonType: true}).then((response) => {
            console.log('response', response);
            if (response.ShiData && response.ShiData.length > 0) {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Result',
                    params: {
                        result: response
                    }
                });
                this.props.navigation.dispatch(navigateAction);
            }
        });
    }

    /**
     * 检索类目查询
     * @returns {*}
     */
    onSelectedItemChange = (id) => {
        console.log('id', id);
        this.setState({initId: String(id)})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <TextInput placeholder='请输入想查询的关键字' editable={true} style={styles.inputStyle} onChangeText={this.onChangeText}/>
                    <TouchableOpacity onPress={this.showData.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={styles.wordC}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems:'center'}}>
                    <RadioModal
                        selectedValue='all'
                        onValueChange={this.onSelectedItemChange}
                        style={{
                            flexDirection:'row',
                            width:354,
                            alignItems:'center',
                            marginTop:10
                        }}
                        innerStyle={{
                            width: 60
                        }}
                    >
                        <Text style={styles.radioOption} value="all">全诗</Text>
                        <Text value="title">诗题</Text>
                        <Text value="sentence">诗句</Text>
                        <Text value="author">作者</Text>
                    </RadioModal>
                </View>
            </View>

        );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    search: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputStyle:{
        width:280,
        height:40,
        borderColor:"#ccc",
        borderWidth:1,
        borderRightWidth: 0,
        // borderRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginLeft:5,
        fontSize: 12,
        fontFamily: '华文行楷',
        padding: 0,
        paddingLeft: 10,
    },
    btn:{
        width:85,
        height:40,
        borderColor:"#ccc",
        borderWidth:1,
        // borderLeftWidth: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#f3dc99",
        // color: '#333'
    },
    wordC:{
        color: '#333',
        fontSize:18,
        fontFamily: '华文行楷'
    },
    radioOption: {
        fontFamily: '华文行楷'
    }
});
