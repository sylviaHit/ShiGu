/**
 * homePage
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import RadioModal from 'react-native-radio-master';
import {NavigationActions} from 'react-navigation';
import data from './data.json';
import {service} from "../../utils/service";
import Search from './Search';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";
import PoetryTimeLine from './PoetryTimeLine';
import Result from './Result';

class PoetryHome extends Component {
    static navigationOptions = {
        title: '',
        header: null

    };
    // 构造
    constructor() {
        super();
        this.data = data;
        this.state={
            searchValue: '',
            status: 'home'
        }
        this.onEventPress = this.onEventPress.bind(this);
    }

    /**
     * 搜索内容改变
     */
    onChangeText=(inputData)=>{
        this.setState({searchValue: inputData});
    }

    onEventPress(data) {
        this.getPoemDetail(data.id);
    }

    getPoemDetail = (id) => {
        let me = this;
        service.get('https://api.sou-yun.com/api/poem', {key: id, jsonType: true}).then((response) => {
            if (response.ShiData && response.ShiData.length > 0) {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'PoemDetail',
                    params: {
                        id: response.ShiData[0].Id,
                        data: response.ShiData[0]
                    }
                });
                this.props.navigation.dispatch(navigateAction);
            }
        });
    };

    /**
     * 跳转到搜索页
     */
    showData=()=>{
        this.setState({
            status: 'result'
        });
        const { store:{poetry : { searchValue, item }} } = this.props.store;
        // console.log(searchValue, item);
        if(searchValue){
            if(!this.props.onGetData){
                // console.log('跳转');
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Result',
                    params: {
                        searchValue: this.state.searchValue
                    }
                });
                this.props.navigation.dispatch(navigateAction);
            }
            if(this.props.onGetData){
                this.props.onGetData(undefined, undefined);
            }
            //
        }
    }

    render() {
        // console.log(this.props.navigation);
        const { searchValue } = this.state;
        const { state: { routeName } } = this.props.navigation;
        const { status } = this.state;
        // console.log('status', status);
        let Component = null;
        switch(status){
            case 'home':
                Component = <PoetryTimeLine onEventPress={this.onEventPress}/>;
                break;
            case 'result':
                Component = <Result/>;
                break;
            default:
                Component = <PoetryTimeLine onEventPress={this.onEventPress}/>;
                break;
        }
        const { store:{poetry : { item }} } = this.props.store;

        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <View style={styles.search}>
                        <TextInput placeholder='请输入想查询的关键字' value={searchValue} editable={true} style={styles.inputStyle} onChangeText={this.onChangeText}/>
                        <TouchableOpacity onPress={this.showData.bind(this)}>
                            <View style={styles.btn}>
                                <Text style={styles.wordC}>搜索</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <RadioModal
                            selectedValue={item}
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
                {/*<Search*/}
                    {/*navigation={this.props.navigation}*/}
                    {/*onChage={this.onChangeText}*/}
                    {/*value={this.state.searchValue || ''}*/}
                {/*/>*/}
                {Component}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state // gives our component access to state through props.toDoApp
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        actionCreate: actionCreate
    } // here we'll soon be mapping actions to props
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PoetryHome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        // paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 10
    },
    searchContainer: {
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
