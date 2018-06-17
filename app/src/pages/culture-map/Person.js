/**
 * 人物简介页
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

type Props = {};
class Person extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            point: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.point || {},
            name: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.name || {}
        };
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            point: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.point || {}
        })
    }

    componentWillMount(){
        // console.log('willmount');
        // this.getData(this.state.point);
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
     * 获取数据
     */
    getData = (point) => {
        const { relation, designer } = point;
        const { store, actionCreate, dispatch } = this.props;
        let relations = relation.split(';');
        console.log('relations', relations);
        this.names = [];
        let dataMap = new Map();
        relations.forEach((uri,index)=>{
            service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                if(response.name && Array.isArray(response.name) && response.name.length !== 0){
                    response.name.forEach(item=>{
                        if(item['@language'] === 'chs'){
                            this.names.push(
                                <TouchableOpacity key={index} onPress={(e) => console.log('e', e)}>
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
    }


    /**
     * 关联数据
     */
    relationTrans = () => {
        const { relation } = this.state.point;
        let relations = relation.split(';');
        console.log('relations', relations);
    }

    render() {
        const { name, point } = this.state;
        console.log('this.props', this.props);
        console.log('this.state', this.state);

        const { store } = this.props.store;
        const { culture } = store;
        console.log('culture', culture, point);
        return (
            <View>
                <View  style={styles.header}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
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

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }

});
