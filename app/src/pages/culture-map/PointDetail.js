/**
 * 故居点详情页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground
} from 'react-native';
import Dimensions from 'Dimensions';
import { service } from '../../utils/service';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";
import {NavigationActions} from "react-navigation";
import Loading from '../../utils/Loading';

type Props = {};
class PointDetail extends Component<Props> {
    static navigationOptions = {
        title: '',
        header: null
    };

    constructor(props){
        super(props);
        this.state = {
            point: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.point || {},
            loading: false
        }
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            point: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.point || {}
        })
    }

    componentWillMount(){
        this.getData(this.state.point);
    }

    /**
     * 跳转到人物详情页
     */
    goToPerson = (e, point, name) => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Person',
            params: {
                name: name,
                point: point
            },
            action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
        });
        this.props.navigation.dispatch(navigateAction);
    };

    /**
     * 获取数据
     */
    getData = (point) => {
        const { relation, designer } = point;
        const { actionCreate, dispatch } = this.props;
        const { store } = this.props.store;
        const { culture } = store;
        let relations = relation.split(';');
        this.names = [];
        this.designers = [];
        let dataMap = {};
        if(relation){
            relations.forEach((uri,index)=>{
                if(!culture || !culture[uri]){  //未请求过此数据
                    this.state.loading = true;
                    service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                        // if(response === null){
                        //     Alert.alert('',
                        //         '数据请求失败o(╥﹏╥)o',
                        //         [
                        //             {text: '确定'}
                        //         ]
                        //     );
                        //     this.setState({
                        //         loading: false
                        //     })
                        //     return;
                        // }

                        if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                            response.name.forEach(item=>{
                                if(item['@language'] === 'chs'){
                                    this.names.push(
                                        <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                            <Text style={{ textDecorationLine: 'underline'}}>
                                                {item['@value']}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })

                            dataMap[uri] = response;
                            // dataMap.set(uri, response);
                            dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
                        }
                        this.setState({
                            loading: false
                        })
                    });
                } else if(culture && culture[uri]){    //已请求过直接从 store 中获取
                    let response = culture[uri];
                    if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                        response.name.forEach(item=>{
                            if(item['@language'] === 'chs'){
                                this.names.push(
                                    <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                        <Text style={{ textDecorationLine: 'underline'}}>
                                            {item['@value']}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                }
            });
        }

        if(Array.isArray(designer) && designer.length > 0){
            designer.forEach((uri,index)=>{
                if(!culture || !culture[uri]){  //未请求过此数据
                    this.state.loading = true;

                    service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                        // if(response === null){
                        //     Alert.alert('',
                        //         '数据请求失败o(╥﹏╥)o',
                        //         [
                        //             {text: '确定'}
                        //         ]
                        //     );
                        //     this.setState({
                        //         loading: false
                        //     })
                        //     return;
                        // }
                        if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                            response.name.forEach(item=>{
                                if(item['@language'] === 'chs'){
                                    this.designers.push(
                                        <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                            <Text>
                                                {item['@value']}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })

                            dataMap[uri] = response;
                            // dataMap.set(uri, response);
                            dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
                        }
                        this.setState({
                            loading: false
                        })
                    });
                } else if(culture && culture[uri]){    //已请求过直接从 store 中获取
                    let response = culture[uri];
                    if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                        response.name.forEach(item=>{
                            if(item['@language'] === 'chs'){
                                this.designers.push(
                                    <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                        <Text>
                                            {item['@value']}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                }
            });
        }else{
            let uri = designer;
            if(uri){
                if(!culture || !culture[uri]){  //未请求过此数据
                    service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                        this.state.loading = true;
                        // if(response === null){
                        //     Alert.alert('',
                        //         '数据请求失败o(╥﹏╥)o',
                        //         [
                        //             {text: '确定'}
                        //         ]
                        //     );
                        //     this.setState({
                        //         loading: false
                        //     })
                        //     return;
                        // }
                        if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                            response.name.forEach(item=>{
                                if(item['@language'] === 'chs'){
                                    this.designers.push(
                                        <TouchableOpacity key={item['@value']} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                            <Text>
                                                {item['@value']}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })

                            dataMap[uri] = response;
                            // dataMap.set(uri, response);
                            dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
                        }
                        this.setState({
                            loading: false
                        })
                    });
                } else if(culture && culture[uri]){    //已请求过直接从 store 中获取
                    let response = culture[uri];
                    if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                        response.name.forEach(item=>{
                            if(item['@language'] === 'chs'){
                                this.designers.push(
                                    <TouchableOpacity key={item['@value']} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                        <Text>
                                            {item['@value']}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                }
            }

        }


    }


    /**
     * 关联数据
     */
    relationTrans = () => {
        const { relation } = this.state.point;
        let relations = relation.split(';');
    }

    render() {

        const { point } = this.state;
        const { store } = this.props.store;
        const { culture } = store;

        this.relationTrans();
        return (
            <ImageBackground  source={require('../../images/poetry-bg-2.jpg')}
                              style={{width: screenWidth, height: screenHeight, marginBottom: 40, padding: 20}}>
                {
                    this.state.loading ?
                        <Loading/> : null
                }
                <View  style={styles.header}>
                    <Text style={styles.name}>
                        {point.name}
                        {point.yname ? `(${point.yname})` : ''}
                    </Text>
                    <Image source={point.src} style={styles.img}/>
                    <Text>
                        {point.address || ''}
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={{ paddingTop: 10}}

                >
                    {
                        point.architecturalStyle || point.architectureStructure ? (
                            <View>
                                <Text style={styles.title}>
                                    建筑风格及简介
                                </Text>
                                <Text>
                                    {point.architecturalStyle || ''}
                                </Text>
                                <Text>
                                    {point.architectureStructure || ''}
                                </Text>
                            </View>
                        ) : null
                    }
                    {
                        point.designer ? (
                            <View>
                                <Text style={styles.title}>
                                    设计师
                                </Text>
                                {this.designers}
                            </View>
                        ) : null
                    }
                    {
                        point.relation ? (
                            <View>
                                <Text style={styles.title}>
                                    相关人物
                                </Text>
                                {this.names}
                            </View>
                        ) : null
                    }
                </ScrollView>


            </ImageBackground>
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
)(PointDetail);

const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        width: null,
    },
    img:{
        width: 400,
        height: 300,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,

    },
    name:{
        fontSize: 26,
        fontFamily: '华文行楷',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bodyContainer: {
        flex: 1,
        width: screenWidth
    },

});
