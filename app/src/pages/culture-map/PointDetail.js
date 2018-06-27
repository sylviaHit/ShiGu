/**
 * 故居点详情页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
import { service } from '../../utils/service';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";
import {NavigationActions} from "react-navigation";

type Props = {};
class PointDetail extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            point: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.point || {}
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
        let dataMap = new Map();
        relations.forEach((uri,index)=>{
            if(!culture || !culture.get(uri)){  //未请求过此数据
                service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                    // console.log('请求数据');
                    if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                        response.name.forEach(item=>{
                            if(item['@language'] === 'chs'){
                                this.names.push(
                                    <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                        <Text>
                                            {item['@value']}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        })

                    }
                    dataMap.set(uri, response);
                    dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
                });
            } else if(culture.get(uri)){    //已请求过直接从 store 中获取
                let response = culture.get(uri);
                if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                    response.name.forEach(item=>{
                        if(item['@language'] === 'chs'){
                            this.names.push(
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
            <View>
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
                            <Text>
                                {point.designer}
                            </Text>
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
)(PointDetail);

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
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }

});
