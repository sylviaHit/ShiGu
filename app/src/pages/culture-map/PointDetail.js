/**
 * 故居点详情页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

type Props = {};
export default class PointDetail extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            params: props.navigation && props.navigation.state && props.navigation.state.params || {}
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            params: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params || {}
        })
    }

    render() {

        const { params } = this.state;
        console.log('params', params);
        return (
            <View>
                <Text>
                    point detail
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
    },
});
