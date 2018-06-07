import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView
} from 'react-native-amap3d';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

export default class CultureMap extends Component {

    // static navigationOptions = {
        // title: '文化地图',
        // headerTitle: <Button title="文化地图"/>,
        // headerRight: (
        //     <Button
        //         onPress={() => alert('This is a button!')}
        //         title="Info"
        //         color="#fff"
        //     />
        // ),
    // };

    componentDidMount() {
    }

    render() {
        return (
            <MapView style={StyleSheet.absoluteFill}/>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
        marginBottom: 16
    }
});
