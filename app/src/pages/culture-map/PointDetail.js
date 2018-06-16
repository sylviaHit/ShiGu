/**
 * 故居点详情页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import { service } from '../../utils/service';

type Props = {};
export default class PointDetail extends Component<Props> {

    constructor(props){
        super(props);
        this.state = {
            point: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.point || {},
            data: []
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
     * 获取数据
     */
    getData = (point) => {
        const { relation, designer } = point;
        let relations = relation.split(';');
        console.log('relations', relations);
        relations.forEach((uri,index)=>{
            service.get('http://data1.library.sh.cn/data/jsonld', {uri: uri, key: '3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e'}).then((response)=>{
                const { data } = this.state;
                data[index] = response;
                this.setState({
                    data: data
                })
            });
        });
        // relations[0] ? service.get('http://data1.library.sh.cn/data/jsonld?uri=http://data.library.sh.cn/entity/person/16zu78c9q5ev7mwy&key=3ca4783b2aa237d1a8f2fae0cd36718dae8dac3e').then((data)=>console.log('data', data)) : null;
    }


    /**
     * 关联数据
     */
    relationTrans = () => {
        const { relation } = this.state.point;
        let relations = relation.split(';');
        console.log('relations', relations);
    }

    /**
     * 相关人物人名转换处理
     * @returns {*}
     */
    transformName = () => {
        const { data } =this.state;
        console.log('dat----------a', data);

        // let dataMap = new Map();
        let names = [];

        if(data && data.length !==0 ){
            data.forEach(person=>{
                if(person.name && Array.isArray(person.name) && person.name.length !== 0){
                    person.name.forEach(item=>{
                        if(item['@language'] === 'chs'){
                            // dataMap.set(item.@value) = person;
                            names.push(item['@value']);
                        }
                    })
                }
            })
        }
        console.log('names', names);
        return names;
    }

    render() {

        const { point } = this.state;

        let names = this.transformName();
        // console.log('point', point);
        // console.log('this.screenWidth', this.screenWidth);
        console.log('this.state.data', this.state.data);

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
                            {
                                names.map((item, index)=>{
                                    return(
                                        <Text key={index}>
                                            {item}
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    ) : null
                }

            </View>
        );
    }
}
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
