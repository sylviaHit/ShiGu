/**
 * homePage
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';
import data from './data.json';
import {service} from "../../utils/service";
import RadioModal from 'react-native-radio-master';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";

class Search extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            initId: 'all'
        }
        this.data = data;
    }

    componentWillMount() {
    }

    /**
     * 搜索内容改变
     */
    onChangeText = (inputData) => {
        const {actionCreate, dispatch} = this.props;
        dispatch(actionCreate('SET_POETRY_SEARCH_VALUE', inputData));
    }

    fetchData = () => {
        const {store: {poetry: {searchValue, item, data}}} = this.props.store;
        let newData = Object.assign({}, data);
        if (!(newData[searchValue] && newData[searchValue][0] && Array.isArray(newData[searchValue][0]))) {
            service.get('https://api.sou-yun.com/api/poem', {
                key: searchValue,
                scope: item,
                pageNo: 0 || 0,
                jsonType: true
            }).then((response) => {
                //无数据
                if (response === null) {
                    return (
                        Alert.alert('',
                            '无更多数据'
                        )
                    )
                }
                if (response.ShiData && response.ShiData.length > 0) {
                    if (newData && newData[searchValue]) {
                        newData[searchValue][0] = response;
                    } else if (newData && !newData[searchValue]) {
                        newData[searchValue] = [];
                        newData[searchValue][0] = response;
                    }
                    const {actionCreate, dispatch} = this.props;
                    dispatch(actionCreate('SET_POETRY_DATA', {
                        data: newData,
                        currentPage: 0,
                        currentStartPage: 0
                    }));

                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Result',
                        params: {
                            searchValue: searchValue
                        }
                    });
                    this.props.navigation.dispatch(navigateAction);
                }
            });
        }
    }

    /**
     * 跳转到搜索页
     */
    showData = () => {
        const {store: {poetry: {searchValue, item}}} = this.props.store;
        console.log(searchValue, item);
        if (searchValue) {
            if (!this.props.onGetData) {
                console.log('跳转');
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Result',
                    params: {
                        searchValue: this.state.searchValue
                    }
                });
                this.props.navigation.dispatch(navigateAction);
            }
            if (this.props.onGetData) {
                this.props.onGetData(undefined, undefined);
            }
            //
        }
    }

    /**
     * 检索类目查询
     * @returns {*}
     */
    onSelectedItemChange = (id) => {
        const {actionCreate, dispatch} = this.props;
        let searchItem = String(id);
        dispatch(actionCreate('SET_POETRY_SEARCH_ITEM', searchItem));
    }

    render() {
        const {store: {poetry: {searchValue, item}}} = this.props.store;
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <TextInput
                        placeholder='请输入想查询的关键字'
                        value={searchValue}
                        editable={true}
                        style={styles.inputStyle}
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangeText}/>
                    <TouchableOpacity onPress={this.fetchData.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={styles.wordC}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <RadioModal
                        selectedValue={item}
                        onValueChange={this.onSelectedItemChange}
                        style={{
                            flexDirection: 'row',
                            width: 354,
                            alignItems: 'center',
                            marginTop: 10
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
)(Search);

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 10,
    },
    search: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputStyle: {
        width: 280,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRightWidth: 0,
        // borderRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginLeft: 5,
        fontSize: 12,
        fontFamily: '华文行楷',
        padding: 0,
        paddingLeft: 10,
    },
    btn: {
        width: 85,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        // borderLeftWidth: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3dc99",
        // color: '#333'
    },
    wordC: {
        color: '#333',
        fontSize: 18,
        fontFamily: '华文行楷'
    },
    radioOption: {
        fontFamily: '华文行楷'
    }
});
