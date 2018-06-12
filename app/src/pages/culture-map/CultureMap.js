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
import { NavigationActions } from 'react-navigation';

import Dimensions from 'Dimensions';
import {service} from "../../utils/service";

export default class CultureMap extends Component {

    // static navigationOptions = {
    //     title: '文化地图',
    //     headerTitle: <Button title="文化地图"/>,
    //     headerRight: (
    //         <Button
    //             onPress={() => alert('This is a button!')}
    //             title="Info"
    //             color="#fff"
    //         />
    //     ),
    // };

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
    _onInfoWindowPress = (e, point) => {
        // Alert.alert('onInfoWindowPress');
        const navigateAction = NavigationActions.navigate({
            routeName: 'PointDetail',

            params: {point: point},

            action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
        });

        this.props.navigation.dispatch(navigateAction);
        // this.props.navigation.navigate('PointDetail');
    }

    /**
     * 生成点标记
     * @returns {*}
     */
    generateMarkers = () => {
        const { data } = this.state;
        const srcs = [
            require('../../images/guju0.jpg'),
            require('../../images/guju1.jpg'),
            require('../../images/guju2.jpg'),
            require('../../images/guju3.jpg'),
            require('../../images/guju4.jpg'),
            require('../../images/guju5.jpg'),
            require('../../images/guju6.jpg'),
            require('../../images/guju7.jpg'),
            require('../../images/guju8.jpg'),
            require('../../images/guju9.jpg'),
            require('../../images/guju10.jpg'),
            require('../../images/guju11.jpg'),
            require('../../images/guju12.jpg'),
            require('../../images/guju13.jpg'),
            require('../../images/guju14.jpg'),
            require('../../images/guju15.jpg'),
            require('../../images/guju16.jpg'),
            require('../../images/guju17.jpg'),
            require('../../images/guju18.jpg'),
            require('../../images/guju19.jpg'),
            require('../../images/guju20.jpg'),
            require('../../images/guju21.jpg'),
            require('../../images/guju22.jpg'),
            require('../../images/guju23.jpg'),
            require('../../images/guju24.jpg'),
            require('../../images/guju25.jpg'),
            require('../../images/guju26.jpg'),
            require('../../images/guju27.jpg'),
            require('../../images/guju28.jpg'),
            require('../../images/guju29.jpg'),
            require('../../images/guju30.jpg'),
            require('../../images/guju31.jpg'),
            require('../../images/guju32.jpg'),
            require('../../images/guju33.jpg'),
            require('../../images/guju34.jpg')
        ];
        let markers = [];
        if(data && Array.isArray(data) && data.length > 0){
            data.forEach((item,index)=>{
                let params = {
                    point: item,
                    image: srcs[index]
                }

                markers.push(
                    <MapView.Marker
                        key={index}
                        color="red"
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
                        <TouchableOpacity activeOpacity={0.9} onPress={e=>this._onInfoWindowPress(e, params)}>
                            <View style={styles.customInfoWindow}>
                                <Text>{item.name}</Text>
                                <Image source={srcs[index]} style={styles.backgroundImage}/>
                            </View>
                        </TouchableOpacity>
                    </MapView.Marker>

                )
            });
        }
        console.log('markers', markers);
        return markers;
    }

    render() {
        return (
            <MapView
                style={styles.backgroundImage}
                coordinate={{
                    latitude: 31.214266,
                    longitude: 121.446494,
                }}
                zoomLevel={19}
            >

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
        backgroundColor: '#c5ffa9',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#a9a2a6',
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
