/**
 * homePage
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions
} from 'react-native';
var {width,height} = Dimensions.get('window');
var dataAry = [];
import data from './data.json';
export default class Poetry extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataAry: dataAry,
        };
    }

    render() {
        return (
            <View style={{marginTop:5}}>
                <FlatList
                    data = {this.state.dataAry}
                    renderItem = {(item) => this.renderRow(item)}
                    keyExtractor={this.keyExtractor}
                />
                <View style={{width:1,height:height,backgroundColor:'#50b6ff',position:'absolute',left:50}}></View>
            </View>
        );
    }

    renderRow =(item) =>{
        if(item.item.text){
            return(
                <View style={{marginBottom:10,marginLeft:60}}>
                    <Text>{item.item.text}</Text>
                </View>
            )
        }else{
            return(
                <View style={{flexDirection:'row',marginBottom:10}}>
                    {/*左边*/}
                    <View style={{width:60,marginBottom:10}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text>{item.item.time}</Text>
                            <View style={styles.timeDot}></View>
                        </View>
                    </View>
                    {/*右边*/}
                    <View style={styles.poemBox} onLayout = {(event)=>this.onLayout(event)} >
                        <Text style={{}}>{item.item.content}</Text>
                    </View>
                </View>
            )

        }



    }

    keyExtractor(item: Object, index: number) {
        return item.id
    }

    onLayout = (event)=>{
        console.log(event.nativeEvent.layout.height)
    }

    componentDidMount() {
        this.setState({
            dataAry:data
        })
    }
}

const styles = StyleSheet.create({
    dynasty:{

    },
    timeDot:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'#50b6ff',
        position:'absolute',
        left:45
    },
    poemBox: {
        backgroundColor:"#fff0bd",
        marginLeft:5,
        width:width-70
    }
});