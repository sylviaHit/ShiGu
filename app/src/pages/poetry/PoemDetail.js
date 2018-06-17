/**诗词详情页**/
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import {NavigationActions} from "react-navigation";

export default class PoemDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.content || ''
        }
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            point: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.content || ''
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={{marginTop:10}}>{this.state.content}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:'white'
    }
});