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

class PoetryTimeLine extends Component {
    static navigationOptions = {
        title: '',
        header: null

    };
    // 构造
    constructor() {
        super();
        this.data = data;
        this.state={
        }
    }

    render() {
        return (
            <Timeline
                style={styles.list}
                data={this.data}
                circleSize={20}
                circleColor='rgb(45,156,219)'
                lineColor='rgb(45,156,219)'
                timeContainerStyle={{minWidth: 52}}
                timeStyle={{
                    textAlign: 'center',
                    backgroundColor: '#ff9797',
                    color: 'white',
                    padding: 5,
                    borderRadius: 13
                }}
                descriptionStyle={{color: 'gray',
                    fontFamily: '华文行楷'}}
                innerCircle={'dot'}
                options={{
                    style: {paddingTop: 5}
                }}
                onEventPress={this.props.onEventPress}
            />
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
)(PoetryTimeLine);

const styles = StyleSheet.create({
    list: {
        flex: 1,
        marginTop: 10
    },
});
