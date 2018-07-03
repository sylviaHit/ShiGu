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
class Person extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            point: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.point || {},
            name: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.name || {},
            more: false,
            workMore: false
        };
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
        this.friends = [];
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            point: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.point || {},
            name: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.name || {}
        })
    }

    componentWillMount(){
        console.log('willmount');
        this.getData(this.state.point);
    }

    transformName1 = () => {
        const { data } =this.state;
        console.log('dat----------a', data);

        // let dataMap = new Map();
        let names = [];

        if(data && data.length !==0 ){
            data.forEach(person=>{
                if(person.name && Array.isArray(person.name) && person.name.length !== 0){
                    person.name.forEach(item=>{
                        if(item['@language'] === 'chs'){
                            this.state.dataMap.set(item['@value'], person);
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
        this.friends = [];
        let dataMap = new Map();
        console.log('friendOf', friendOf, point);
        if(friendOf && Array.isArray(friendOf)){
            friendOf.forEach((uri,index)=>{
                service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                    if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                        response.name.forEach(item=>{
                            if(item['@language'] === 'chs'){
                                console.log('item', item, item['@value'] );
                                this.friends.push(
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
            });
        }else if(friendOf){
            service.get('http://data1.library.sh.cn/data/jsonld', {uri: friendOf, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                console.log('response', response);
                if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                    response.name.forEach(item=>{
                        if(item['@language'] === 'chs'){
                            this.friends.push(
                                <TouchableOpacity  onPress={(e) => this.goToPerson(e, response, item['@value'])}>
                                    <Text>
                                        {item['@value']}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    })

                }
                dataMap.set(friendOf, response);
                dispatch(actionCreate('SET_POINT_DETAIL', dataMap ));
            });
        }
    }


    /**
     * 关联数据
     */
    relationTrans = () => {
        const { relation } = this.state.point;
        let relations = relation.split(';');
        console.log('relations', relations);
    }

    briefBiographyTrans = (arr) => {
        let elems = [];
        if(arr && Array.isArray(arr)){
            arr.forEach((item,index)=>{
                elems.push(
                    <Text key={index}>
                        {item}
                    </Text>
                    //<ScrollView  key={index} contentContainerStyle={styles.content}>
                    //  <Text style={styles.text}>
                    //    {item}
                    //</Text>
                    //</ScrollView>
                )
            });
        }else{
            elems.push(
                <Text>
                    {arr}
                </Text>
                //<ScrollView  key={index} contentContainerStyle={styles.content}>
                //  <Text style={styles.text}>
                //    {item}
                //</Text>
                //</ScrollView>
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
        this.works = [];
        if(creatorOf && Array.isArray(creatorOf)){
            creatorOf.forEach((item,index)=>{
                service.get('http://data1.library.sh.cn/data/jsonld', {uri: item, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                    if(response){
                        this.works.push(response);
                        if(this.works.length === creatorOf.length){
                            this.setState({
                                works: this.works,
                                workMore: !this.state.workMore
                            })
                        }
                    }
                });
            })
        }
        console.log('this.works', this.works);

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
                    <TouchableOpacity key={index}>
                        <Text>
                            {item.title}
                        </Text>
                    </TouchableOpacity>

                );
            })
        }
        return workList;
    }

    render() {
        const { name, point } = this.state;
        // console.log('this.props', this.props);
        console.log('this.state', this.state);

        const { store } = this.props.store;
        const { culture } = store;
        // console.log('culture', culture, point);
        return (
            <ScrollView>
                <View  style={styles.header}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text>
                        ({point.birthday || ''}-{point.deathday || ''})
                    </Text>

                </View>
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
                    this.friends ?
                        <View>
                            <Text style={styles.title}>好友列表</Text>
                            {
                                this.friends
                            }
                        </View> : null
                }
                {
                    point.creatorOf ?
                        <View>
                            <TouchableOpacity onPress={e=>this.getWork(e, point.creatorOf)}>
                                <Text style={styles.title}>{this.state.workMore ? '收起作品列表' : '打开作品列表'}</Text>
                            </TouchableOpacity>

                            <View  style={!this.state.workMore ? styles.workList : styles.more_workList}>
                                {this.renderWorks()}
                            </View>
                        </View> : null
                }
            </ScrollView>
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
    content: {
        width: this.screenWidth,
        height: 66
    },
    more_content: {
        width: this.screenWidth,
    },
    workList: {
        width: this.screenWidth,
        height: 0
    },
    more_workList: {
        width: this.screenWidth,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    open_more:{
        color: '#00f'
    }

});
