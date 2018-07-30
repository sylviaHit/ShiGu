/**诗词游戏**/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
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

class GameHome extends Component {
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            closeMention: false,
            keyWords: '人',
            text: '',
            data: []
        };
        this.pageNo = 0;
        this.dataAll = [];
        this.data = [];
    }

    getData = () => {
        service.get('https://api.sou-yun.com/api/poem', {key: this.state.keyWords, scope: 3, pageNo: this.pageNo, jsonType: true}).then((response) => {
            // console.log('response', response);
            // console.log(this.state.text);
            if (response.ShiData && response.ShiData.length > 0) {
                this.dataAll.push(response.ShiData);
                if(response.ShiData.length === 20){
                    this.pageNo += 1;
                    // this.getData();
                }
            }
        });
    }

    componentWillMount() {
        this.dataAll = [];
        this.getData();
        // console.log('this.dataAll', this.dataAll);
    }

    componentWillReceiveProps(nextProps) {
    }

    /**
     * 点击关卡
     */
    pressBlockade = (index) =>{
        const navigateAction = NavigationActions.navigate({
            routeName: 'GameDetail',
            params: {
                index: index
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    /**
     * 渲染关卡
     * @returns {*}
     */
    renderBlockade = () => {
        const { store: { game: { blockade, keyWords } } } = this.props.store;
        let blockades = [];
        for(let i=0;i<40;i++){
            //关卡样式位置
            let left = 0;
            if(i % 4 === 0 ){
                left = 28;
            }else if((i-1)%2 === 0){
                left = 126;
            }else if((i-2)%4 === 0){
                left = 224;
            }

            let keyWord = keyWords[i];//关键字

            if(i+1 <= blockade){//已解锁关卡
                blockades.push(
                    <View style={styles.blockadeContainer} key={i} >
                        <TouchableOpacity style={[styles.keyWordsContainer, {left: left, backgroundColor: '#eeede7', borderColor: '#fff'}]} onPress={e=>this.pressBlockade(i, e)}>
                            <Text style={[styles.keyWords, {color: '#000'}]}>{keyWord}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }else{//未解锁关卡
                blockades.push(
                    <View style={styles.blockadeContainer} key={i} >
                        <View style={[styles.keyWordsContainer, {left: left}]}>
                            <Text style={[styles.keyWords, {color: '#ccc'}]}>?</Text>
                        </View>
                    </View>
                )
            }




        }
        return blockades;
    }

    render() {
        // console.log('this.props-------------', this.props);
        const { store } = this.props.store || store;
        return (
            <ImageBackground source={require('../../images/poetry-bg-2.jpg')} style={{width: screenWidth,height: screenHeight}}>
                <ScrollView
                    style={styles.bodyContainer}
                    contentContainerStyle={{ alignItems: 'center' }}

                >
                    {this.renderBlockade()}
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
)(GameHome);

const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrap: {
        alignItems:'center',
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
        // transform: [{rotateZ:'45deg'}],
        borderColor: '#ccc',
        borderWidth: 1,
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
    inputStyle:{
        width:280,
        height:50,
        borderColor:"#ccc",
        borderWidth:1,
        borderRightWidth: 0,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginLeft:5,
        fontSize: 16,
        fontFamily: '华文行楷',
        padding: 0,
        paddingLeft: 10,
    },
    btn:{
        width:85,
        height:50,
        borderColor:"#ccc",
        borderWidth:1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#d4f3d4",
    },
    submit: {
        fontSize: 18,
        fontFamily: '华文行楷',
    },
    bodyContainer: {
        flex: 1,
        width: screenWidth,
        marginTop: 20,
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
        width:210,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        lineHeight: 50,
    },
    title: {
        width:155,
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
        width: screenWidth*0.8,
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
    popCloseTxt:{
        textAlign: 'center',
        color: '#333',
        fontSize:14,
    }
});
