import React, { Component } from 'react';

import {
    MapView
} from 'react-native-amap3d';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight, Alert,TouchableOpacity
} from 'react-native';

import Dimensions from 'Dimensions';
import {service} from "../../utils/service";

export default class CultureMap extends Component {

    static navigationOptions = {
        title: '文化地图',
        headerTitle: <Button title="文化地图"/>,
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        console.log('data-------------');
        service.post('http://data.library.sh.cn/wkl/webapi/building/dolist',{ freetext: ''}).then((data)=>{
                console.log('data', data);
                this.setState({
                    data: data.detail
                })
            }
        );
    }

    componentWillReceiveProps(nextProps){

    }
    _onInfoWindowPress = () => Alert.alert('onInfoWindowPress')


    /**
     * 生成点标记
     * @returns {*}
     */
    generateMarkers = () => {
        const { data } = this.state;
        let markers = [];
        data.forEach((item,index)=>{
            markers.push(
                <MapView.Marker
                    key={index}
                    color="green"
                    coordinate={{
                        latitude: Number(item.lat),
                        longitude: Number(item.long),
                    }}
                    // icon={() => (
                    //     <View style={styles.customMarker}>
                    //         <Text style={styles.markerText}>aaaaassss</Text>
                    //     </View>
                    // )}
                >
                    <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                        <View style={styles.customInfoWindow}>
                            <Text>自定义信息窗口</Text>
                            <Image source={require('../../images/bg.gif')} style={styles.backgroundImage}/>
                        </View>
                    </TouchableOpacity>
                </MapView.Marker>

            )
        });
        console.log('markers', markers);
        return markers;
    }

    render() {
        return (
            <MapView style={styles.backgroundImage}>
                center={ (121.446494,31.214266)}
                {this.generateMarkers()}
                {/*<MapView.Marker color="green" coordinate={{*/}
                    {/*latitude: 39.806901,*/}
                    {/*longitude: 116.397972,*/}
                {/*}*/}
                {/*} icon={() => (*/}
                    {/*<View style={styles.customMarker}>*/}
                        {/*<Text style={styles.markerText}>aaaaassss</Text>*/}
                    {/*</View>*/}
                {/*)} >*/}
                    {/*<TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>*/}
                        {/*<View style={styles.customInfoWindow}>*/}
                            {/*<Text>自定义信息窗口</Text>*/}
                            {/*<Image source={require('../../images/bg.gif')} style={styles.backgroundImage}/>*/}
                        {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                {/*</MapView.Marker>*/}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        width: null,
        height: 100,
        flex:1,
    },
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
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#8bc34a',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#689F38',
        marginBottom: 5,
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
});
