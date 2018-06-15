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
        // this.getData(this.state.point);
    }

    /**
     * 获取数据
     */
    getData = (point) => {
        const { relation, designer } = point;
        let relations = relation.split(';');
        console.log('relations', relations);
        relations[0] ? service.get(`${relations[0]}?output=application/rdf+json`).then((data)=>console.log('data', data)) : null;
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

        const { point } = this.state;
        console.log('point', point);
        console.log('this.screenWidth', this.screenWidth);

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
                            <Text>
                                {point.relation}
                            </Text>
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
