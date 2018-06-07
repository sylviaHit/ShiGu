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

        }
    }

    render() {
        return (
            <Image style={styles.wrap} source= {require('../../images/poetry-bg-1.jpg')}>

            </Image>
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
