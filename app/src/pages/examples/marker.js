import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { MapView } from 'react-native-amap3d'

const styles = StyleSheet.create({
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
})

export default class MarkerExample extends Component {
    static navigationOptions = {
        title: '添加标记',
    }

    state = {
        time: new Date(),
    }

    componentDidMount() {
        this.mounted = true
        setInterval(() => {
            if (this.mounted) {
                this.setState({ time: new Date() })
            }
        }, 1000)
    }

    componentWillUnmount() {
        this.mounted = false
    }

    _coordinates = [
        {
            latitude: 39.806901,
            longitude: 116.397972,
        },
        {
            latitude: 39.806901,
            longitude: 116.297972,
        },
        {
            latitude: 39.906901,
            longitude: 116.397972,
        },
        {
            latitude: 39.706901,
            longitude: 116.397972,
        },
    ]

    _onMarkerPress = () => Alert.alert('onPress')
    _onInfoWindowPress = () => Alert.alert('onInfoWindowPress')
    _onDragEvent = ({ nativeEvent }) => Alert.alert(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)

    render() {
        return (
            <MapView style={StyleSheet.absoluteFill}>
                <MapView.Marker color="green" coordinate={this._coordinates[1]} icon={() => (
                    <View style={styles.customMarker}>
                        <Text style={styles.markerText}>aaaaassss</Text>
                    </View>
                )} >
                    <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                        <View style={styles.customInfoWindow}>
                            <Text>自定义信息窗口</Text>
                            <Text>{this.state.time.toLocaleTimeString()}</Text>
                            <Image source={require('../../images/bg.gif')} style={style.backgroundImage}/>
                        </View>
                    </TouchableOpacity>
                </MapView.Marker>
                <MapView.Marker
                    image="flag"
                    title="自定义图片"
                    // onPress={this._onMarkerPress}
                    coordinate={this._coordinates[2]}
                    icon={() => (
                        <View style={styles.customMarker}>
                            <Text style={styles.markerText}>aaaaassss</Text>
                        </View>
                    )}
                >
                    <Image source={require('../../images/bg.gif')} style={style.backgroundImage}/>
                </MapView.Marker>
                <MapView.Marker
                    title="自定义 View"
                    icon={() => (
                        <View style={styles.customMarker}>
                            <Text style={styles.markerText}>1122233</Text>
                        </View>
                    )}
                    coordinate={this._coordinates[3]}
                />
            </MapView>
        )
    }
}
const style = StyleSheet.create({
    backgroundImage:{
        width: 200,
        height: 100,
    },
    wrap: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: 500,
        height: 400,
        alignItems: 'center',
    },
    linearGradient: {
        width: 65,
        height: 65,
        backgroundColor:'transparent',
        borderRadius: 40,
        shadowColor: '#ccc',
        shadowOffset:  {width: 3, height: 6}
    },
    demo: {
        width: 65,
        height: 65,
        backgroundColor:'transparent',
        borderRadius: 40,
        transform: [{rotateZ:'45deg'}],
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        transform: [{rotateZ:'-45deg'}],
    },
    test: {
        width: 65,
        height: 65,
        backgroundColor:'#504488',
        borderRadius: 40,
        transform: [{rotateZ:'45deg'}],
        opacity : 1,
        borderWidth:2,
        borderColor: '#fff',
        shadowColor:'white',
        shadowOffset:{h:10,w:10},
        shadowRadius:3,
        shadowOpacity:0.8,
    },
    text: {
        fontSize: 30
    }
});