/**
 * 人物简介页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
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
class Person extends Component<Props> {
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor(props){
        super(props);
        this.state = {
            point: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.point || {},
            name: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.name || {},
            friends: [],
            more: false,
            workMore: false,
            loading: false
        };
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.navigation.state.params.name !== this.state.name){
            this.getData(nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.point || {});
        }
        this.setState({
            point: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.point || {},
            name: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.name || {},
            works: [],
            workMore: false
        })
    }

    componentWillMount(){
        this.getData(this.state.point);
    }

    transformName1 = () => {
        const { data } =this.state;
        let names = [];

        if(data && data.length !==0 ){
            data.forEach(person=>{
                if(person.name && Array.isArray(person.name) && person.name.length !== 0){
                    person.name.forEach(item=>{
                        if(item['@language'] === 'chs'){
                            this.state.dataMap[item['@value']] = person;
                        }
                    })

                }

            })
        }
        return names;
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
        const { friendOf } = point;
        const { store, actionCreate, dispatch } = this.props;
        let friends = [];
        this.state.friends = [];
        let dataMap = {};
        if(friendOf && Array.isArray(friendOf)){
            friendOf.forEach((uri,index)=>{
                service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                    if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                        response.name.forEach(item=>{
                            if(item['@language'] === 'chs'){
                                let friends = this.state.friends;
                                friends.push(
                                    <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                        <Text style={{ textDecorationLine: 'underline'}}>
                                            {item['@value']}
                                        </Text>
                                    </TouchableOpacity>
                                );
                                this.setState({
                                    friends: friends
                                })
                            }
                        })
                        dataMap[uri] =  response;
                        dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
                    }

                });
            });
        }else if(friendOf){
            service.get('http://data1.library.sh.cn/data/jsonld', {uri: friendOf, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                    response.name.forEach((item, index)=>{
                        if(item['@language'] === 'chs'){
                            this.setState({
                                friends: (
                                    <TouchableOpacity key={index} onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                        <Text style={{ textDecorationLine: 'underline'}}>
                                            {item['@value']}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    })

                }
                dataMap[friendOf] = response;
                dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
            });

        }else {
            this.setState({
                friends: []
            })
        }
    }


    /**
     * 关联数据
     */
    relationTrans = () => {
        const { relation } = this.state.point;
        let relations = relation.split(';');
    }

    briefBiographyTrans = (arr) => {
        let elems = [];
        if(arr && Array.isArray(arr)){
            arr.forEach((item,index)=>{
                elems.push(
                    <Text key={index}>
                        {item}
                    </Text>
                )
            });
        }else{
            elems.push(
                <Text key={0}>
                    {arr}
                </Text>
            )
        }
        return elems;
    }

    openMore = () =>{
        this.setState({
            more: !this.state.more
        })
    }

    openWorkMore = () =>{
        this.setState({
            workMore: !this.state.workMore
        })
    }

    /**
     * 查看作品
     */
    getWork = (e, creatorOf) => {
        let works = [];
        if(!this.state.workMore){
            if(creatorOf && Array.isArray(creatorOf)){
                creatorOf.forEach((item,index)=>{
                    service.get('http://data1.library.sh.cn/data/jsonld', {uri: item, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                        this.setState({
                            loading: true
                        })
                        if(response === null){
                            Alert.alert('',
                                '无数据o(╥﹏╥)o',
                                [
                                    {text: '确定'}
                                ]
                            )
                            this.setState({
                                loading: falses
                            })
                        }
                        if(response){
                            works.push(response);
                            if(works.length === creatorOf.length){
                                this.setState({
                                    works: works,
                                    workMore: !this.state.workMore,
                                    loading: false
                                })
                            }
                        }

                    });
                })
            }else{
                service.get('http://data1.library.sh.cn/data/jsonld', {uri: creatorOf, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                    if(response === null){
                        Alert.alert('',
                            '无数据o(╥﹏╥)o',
                            [
                                {text: '确定'}
                            ]
                        )
                    }
                    if(response){
                        works = response;
                        this.setState({
                            works: works,
                            workMore: !this.state.workMore
                        })
                    }

                });
            }
        }
    }

    /**
     * 渲染作品列表
     */
    renderWorks = () => {
        const { works } = this.state;
        let workList = [];
        if(works && Array.isArray(works)){
            works.forEach((item,index)=>{
                workList.push(
                    <Text key={index}>
                        {item.title}
                    </Text>

                );
            })
        }
        return workList;
    }

    render() {
        const { name, point } = this.state;

        const { store } = this.props.store;
        const { culture } = store;
        return (
            <ImageBackground  source={require('../../images/poetry-bg-2.jpg')}
                              style={{width: screenWidth, height: screenHeight, marginBottom: 40}}>
                {
                    this.state.loading ?
                        <Loading/> : null
                }
                <View  style={styles.header}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    {
                        point.birthday || point.deathday ? (
                            <Text>
                                <Text>
                                    （{point.birthday || ''}
                                </Text>
                                -
                                <Text>
                                    {point.deathday || ''}）
                                </Text>
                            </Text>

                        ) : null
                    }

                </View>
                <ScrollView
                    style={{paddingLeft: 20}}
                    contentContainerStyle={{ paddingBottom: 40}}
                >

                    {
                        point.briefBiography ? (
                            <View>
                                <Text style={styles.title}>人物小传</Text>
                                <Text  style={!this.state.more ? styles.content : styles.more_content}>
                                    {point.gender ? `${point.gender},` : ''}
                                    {
                                        this.briefBiographyTrans(point.briefBiography)
                                    }
                                </Text>
                                <TouchableOpacity onPress={this.openMore}>
                                    <Text style={styles.open_more}>{this.state.more ? '收起内容' : '查看更多'}</Text>
                                </TouchableOpacity>

                            </View>
                        ) : null
                    }
                    {
                        this.state.friends && this.state.friends.length !== 0 ?
                            <View>
                                <Text style={styles.title}>好友列表</Text>
                                <View style={{padding: 8}}>
                                    {
                                        this.state.friends
                                    }
                                </View>

                            </View> : null
                    }
                    {
                        point.creatorOf ?
                            <View style={{paddingBottom: 40}}>
                                <TouchableOpacity onPress={e=>this.getWork(e, point.creatorOf)}>
                                    <Text style={styles.title}>获取作品列表</Text>
                                </TouchableOpacity>

                                <View  style={!this.state.workMore ? styles.workList : styles.more_workList}>
                                    {this.renderWorks()}
                                </View>
                            </View> : null
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
)(Person);
const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        width: null,
        margin: 20
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
    content: {
        // borderColor: '#ccc',
        // borderWidth: 1,
        // width: screenWidth,
        padding: 5,
        height: 78
    },
    more_content: {
        // borderColor: '#ccc',
        // borderWidth: 1,
        // width: screenWidth,
        padding: 5
    },
    workList: {
        width: screenWidth,
        height: 300,
        padding: 8
    },
    more_workList: {
        width: screenWidth,
        padding: 8
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    open_more:{
        color: '#00f'
    }

});
