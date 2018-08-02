/**
 * 故居点详情页武康路部分主页
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';
import { service } from '../../utils/service';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";
import {NavigationActions} from "react-navigation";

type Props = {};
class WuKangRoad extends Component<Props> {
    static navigationOptions = {
        title: '',
        header: null
    };

    constructor(props){
        super(props);
        this.state = {
        }

    }

    componentWillReceiveProps(nextProps){

    }

    componentWillMount(){
        {/*<ImageBackground source={require('../../images/wu2.jpg')} style={{ flex: 1,alignItems:'center',width: null, height: null}}>*/}
        {/*<ScrollView*/}
        {/*// style={styles.bodyContainer}*/}
        {/*contentContainerStyle={{ paddingTop: 40}}*/}
        {/*>*/}
        {/*<View>*/}
        {/*<Text style={{color: '#fff', fontSize: 30, fontFamily: '华文行楷'}}>五步一景，十步一重天</Text>*/}
        {/*<Text style={{color: '#fff', fontSize: 26, fontFamily: '华文行楷'}}>————永不拓宽的武康路</Text>*/}
        {/*</View>*/}
        {/*</ScrollView>*/}
        {/*</ImageBackground>*/}
    }

    /**
     * 跳转到地图页
     */
    goToCultureMap = () => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'CultureMap',
            params: {

            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {

        return (

            <View style={{ flex: 1, alignItems:'center', width: null, height: null, backgroundColor: '#fff'}}>
                <ScrollView
                    contentContainerStyle={{ paddingTop: 30, alignItems:'center'}}
                >
                    <View>
                        <Text style={{width: 360, textAlign: 'center', color: '#666', fontSize: 30, fontFamily: '华文行楷'}}>五步一景，十步一重天</Text>
                        <Text style={{width: 360, textAlign: 'right', height: 50, lineHeight: 50, color: '#666', fontSize: 26, fontFamily: '华文行楷'}}>———永不拓宽的武康路</Text>
                    </View>
                    <Image source={require('../../images/guju25.jpg')} style={{ flex: 1,alignItems:'center',width: screenWidth-20, height: 300, borderRadius:10}}/>
                    <Text style={{padding: 10, fontSize:18, fontFamily: '华文行楷'}}>
                        武康路位于上海市徐汇区，原名福开森路，全长1183米，整条路呈弧线形。是文化国家部与文物局批准的“中国历史文化名街”。
                    </Text>
                    <Text style={{padding: 10, fontSize:18, fontFamily: '华文行楷'}}>
                        正如萧伯纳所说：“走进这里，不会写诗的人想写诗，不会画画的人想画画，不会唱歌的人想唱歌，感觉美妙极了。”
                    </Text>
                    <Text style={{padding: 10, fontSize:18, fontFamily: '华文行楷'}}>
                        这里有邬达克的武康大楼、巴金的故居、迷你欧洲武康庭。梧桐小马路骨子里透着优雅与沉静，也沉浸着上海独有的气质。
                    </Text>
                    <TouchableOpacity onPress={this.goToCultureMap}>
                        <Text style={{width: 360, textAlign: 'right', color: '#f00', padding: 10, fontSize:18, fontFamily: '华文行楷', textDecorationLine: 'underline'}}>
                            点击开启武康路探寻之旅 >>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
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
)(WuKangRoad);

const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        width: null,
    },
    img:{
        width: 320,
        height: 500,
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
