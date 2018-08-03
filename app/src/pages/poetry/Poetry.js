/**
 * homePage
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-listview'
import {NavigationActions} from 'react-navigation';
import data from './data.json';
import {service} from "../../utils/service";
import Search from './Search';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";

class Poetry extends Component {
    static navigationOptions = {
        title: '',
        header: null

    };
    // 构造
    constructor() {
        super();
        this.data = data;
        this.state={
            searchValue: ''
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

    render() {
        return (
            <View style={styles.container}>
                <Search
                    navigation={this.props.navigation}
                    onChage={this.onChangeText}
                    value={this.state.searchValue || ''}
                />
                <Timeline
                    style={styles.list}
                    data={this.data}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{minWidth: 52}}
                    timeStyle={{
                        textAlign: 'center',
                        // width: 60,
                        // backgroundColor: '#ff9797',
                        backgroundColor: '#f3dc99',
                        color: 'white',
                        padding: 5,
                        borderRadius: 10
                    }}
                    titleStyle={{
                        fontSize: 14,
                        fontFamily: '华文行楷'
                    }}
                    descriptionStyle={{color: 'gray',
                        fontFamily: '华文行楷',
                        fontSize: 16}}
                    innerCircle={'dot'}
                    options={{
                        style: {paddingTop: 5}
                    }}
                    onEventPress={this.onEventPress}

                />
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
)(Poetry);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        // marginTop: 10,
        paddingLeft: 25,
    },
});
