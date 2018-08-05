import React, { Component } from 'react';

import {
    MapView
} from 'react-native-amap3d';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";

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
import Carousel from 'react-native-snap-carousel';

import Dimensions from 'Dimensions';
import {service} from "../../utils/service";
import Loading from '../../utils/Loading';

class CultureMap extends Component {

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
    static navigationOptions = {
        title: '',
        header: null
    };

    constructor(props){
        super(props);
        this.state = {
            currentIndex: 4,
            data: [],
            loading: false
        };

        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
        this.srcs = [
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
    }

    componentWillMount() {
        // const { store, actionCreate, dispatch } = this.props;
        this.state.loading = true;
        service.post('http://data.library.sh.cn/wkl/webapi/building/dolist',{ freetext: ''}).then((data)=>{
            if(data){
                data.detail.map((item,index)=>{
                    item.src = this.srcs[index];
                    return item;
                });

                // dispatch(actionCreate('SET_POINT_DETAIL', data ));
                this.setState({
                    data: data.detail,
                    loading: false
                })
            }else{
                Alert.alert('',
                    '数据请求失败o(╥﹏╥)o',
                    [
                        {text: '确定'}
                    ]
                );
                this.setState({
                    loading: false
                })
            }

            }
        );
    }

    componentWillReceiveProps(nextProps){

    }
    _onInfoWindowPress = (e, point) => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'PointDetail',
            params: {point: point},
        });

        this.props.navigation.dispatch(navigateAction);
    }

    onMarkerPress = (e, index) => {
        this.setState({
            currentIndex : index
        })
    }

    /**
     * 生成点标记
     * @returns {*}
     */
    generateMarkers = () => {
        const { data, currentIndex } = this.state;
        let markers = [];
        if(data && Array.isArray(data) && data.length > 0){
            data.forEach((item,index)=>{

                let color = currentIndex === index ? 'red' : 'green';

                markers.push(
                    <MapView.Marker
                        key={index}
                        color={color}
                        coordinate={{
                            latitude: Number(item.lat),
                            longitude: Number(item.long),
                        }}
                        onPress={(e)=> this.onMarkerPress(e, index)}

                        // icon={() => (
                        //     <View style={styles.customMarker}>
                        //         <Text style={styles.markerText}>aaaaassss</Text>
                        //     </View>
                        // )}
                    >
                        <View style={styles.customMarker}>
                            {/*<Text style={styles.markerText}> { item.name || '' } </Text>*/}
                        </View>
                    </MapView.Marker>

                )
            });
        }
        return markers;
    }

    onSnapToItem = (slideIndex) => {
        this.setState({
            currentIndex: slideIndex
        })
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={e=>this._onInfoWindowPress(e, item)}>
                <View>
                    <Text style={styles.title}>{ item.name || ''}</Text>
                    <Image style={styles.image} source={item.src}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const coordinate = {
            latitude: 31.214266,
            longitude: 121.446494,
        }
        return (
            <View style={styles.wrap}>
                {
                    this.state.loading ?
                        <Loading/> : null
                }
                <MapView
                    style={styles.map}
                    coordinate={coordinate}
                    zoomLevel={15}
                >

                    {this.generateMarkers()}
                </MapView>
                <View style={styles.container}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        currentIndex={this.state.currentIndex}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        sliderWidth={this.screenWidth-60}
                        itemWidth={this.screenWidth-60}
                        layout={'default'}
                        firstItem={this.state.currentIndex}
                        onSnapToItem = {this.onSnapToItem}
                    />
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
)(CultureMap);


const styles = StyleSheet.create({
    wrap: {
        width: null,
        flex:1
    },
    map:{
        width: null,
        height: 100,
        flex:1,
    },
    row: {
        flexDirection: 'row',
        height: 40
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#c5ffa9',
        color: 'black',
        padding: 10,
        borderRadius: 5,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#a9a2a6',
        marginBottom: 5,
    },
    customMarker: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'transparent',
        padding: 5,
    },
    markerText: {
        color: '#000',
    },
    container: {
        position: 'absolute',
        bottom: 10,
        left: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        width:this.screenWidth-60,
        height:240,
        resizeMode: 'cover',
        borderRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
});
