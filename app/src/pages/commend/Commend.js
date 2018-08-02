/**每日诗词推荐**/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    Button,
    ImageBackground, Alert
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import {service} from "../../utils/service";
import {NavigationActions} from "react-navigation";
import Dimensions from 'Dimensions';
import Carousel from 'react-native-snap-carousel';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";

class Commend extends Component {
    static navigationOptions = {
        title: '',
        header: null,
        // headerTintColor: 'transparent'
        // headerStyle: {
        //     backgroundColor: 'transparent'
        // }
    };
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

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getData = () => {
        service.get('https://www.sojson.com/open/api/lunar/json.shtml').then((response) => {
            if (response && response.message === 'success') {
                console.log('response', response);
                let month = response.data.month;
                let day = response.data.day;
                let jieqi = response.data.jieqi;
                this.jieqiRecent = '';
                let cha = 40;
                for(let key in jieqi){
                    let item = jieqi[key];
                    console.log('item', item, key, cha, Math.abs(day-key));
                    if(Math.abs(day-key)<cha){
                        this.jieqiRecent = item;
                        cha = Math.abs(day-key);
                    }
                }
                console.log('this.jieqiRecent', this.jieqiRecent);
            }
        });
    }

    componentWillMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
    }


    render() {
        const {store} = this.props.store || store;
        return (
            <ImageBackground source={require('../../images/gamebg3.jpeg')}
                             style={{width: screenWidth, height: screenHeight}}>
                <View style={{
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: 'transparent',
                    margin: 20,
                    marginBottom: 0
                }}>
                    <Text style={{fontSize: 30, fontFamily: '华文行楷', color: '#fff', textAlign: 'center'}}>游戏规则</Text>
                    <Text style={{fontSize: 20, fontFamily: '华文行楷', color: '#000'}}>
                        本游戏借鉴古代“飞花令”，每一关有一个关键字作为令牌，输入令牌后点击“行令”，
                        若诗句正确，则行令成功，每一关行令成功10次，即可过关！
                    </Text>
                </View>
                <ScrollView
                    style={styles.bodyContainer}
                    contentContainerStyle={{alignItems: 'center', paddingTop: 40, paddingBottom: 40}}

                >
                </ScrollView>
            </ImageBackground>
        )
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
)(Commend);

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: screenHeight,
    },
    blockadeContainer: {
        width: 320,
        height: 70,
        // borderColor: '#eea760',
        // borderWidth: 1,
    },
    keyWordsContainer: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        // transform: [{rotateZ:'45deg'}],
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 35,
        // backgroundColor: '#fffad2'
        // top: 45
    },
    keyWords: {
        color: '#000',
        fontSize: 40,
        fontFamily: '华文行楷',
        width: 70,
        height: 70,
        // transform: [{rotateZ:'-45deg'}],
        textAlign: 'center',
        lineHeight: 70
    },
    input: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80
    },
    inputStyle: {
        width: 280,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRightWidth: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginLeft: 5,
        fontSize: 16,
        fontFamily: '华文行楷',
        padding: 0,
        paddingLeft: 10,
    },
    btn: {
        width: 85,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d4f3d4",
    },
    submit: {
        fontSize: 18,
        fontFamily: '华文行楷',
    },
    bodyContainer: {
        flex: 1,
        width: screenWidth,
        // marginTop: 20,
    },
    container: {
        flexDirection: 'row',
    },
    sentence: {
        fontSize: 18,
        fontFamily: '华文行楷',
        // backgroundColor:"#d4f3d4",
        // borderColor:"#ccc",
        // borderWidth:1,
        // borderRadius: 5,
        width: 210,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        lineHeight: 50,
    },
    title: {
        width: 155,
        fontSize: 18,
        // fontFamily: '华文行楷',
        textDecorationLine: 'underline',
        textAlign: 'right',
        height: 50,
        lineHeight: 50,
        // borderColor:"#cc682a",
        // borderWidth:1,
    },
    pop: {
        width: screenWidth * 0.8,
        padding: 10,
    },
    popTitle: {
        fontSize: 20,
        fontFamily: '华文行楷',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    popTxt: {
        fontSize: 14,
    },
    popCloseContainer: {
        marginTop: 10,
        backgroundColor: '#d4f3d4',
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        padding: 5
    },
    popCloseTxt: {
        textAlign: 'center',
        color: '#333',
        fontSize: 14,
    }
});
