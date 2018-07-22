/**诗词游戏**/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import {service} from "../../utils/service";
import {NavigationActions} from "react-navigation";
import Dimensions from 'Dimensions';
import Carousel from 'react-native-snap-carousel';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";

class Game extends Component {
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            closeMention: false
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }


    /**
     * 搜索内容改变
     */
    onChangeText=(inputData)=>{
        this.setState({showValue: inputData});
    }


    /**
     * 跳转到搜索页
     */
    showData=()=>{
        let me = this;
        console.log('me', me, me.state.initId);

        service.get('https://api.sou-yun.com/api/poem', {key: this.state.showValue, scope: this.state.initId, jsonType: true}).then((response) => {
            console.log('response', response);
            if (response.ShiData && response.ShiData.length > 0) {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'Result',
                    params: {
                        result: response
                    }
                });
                this.props.navigation.dispatch(navigateAction);
            }
        });
    }

    /**
     * 关闭提示
     */
    closeMention = () => {
        this.setState({
            closeMention: true
        })
    }

    render() {
        console.log('this.props-------------', this.props);
        const { store } = this.props.store || store;
        // if(store && store.game && !store.game.mention){
        //     // alert('游戏规则：sfdsfas');
        //     this.popupDialog.show();
        // }
        // if()
        return (
                <View style={styles.wrap}>
                    <View style={styles.keyWordsContainer}>
                        <Text style={styles.keyWords}>人</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder='请输入包含“人”字的诗句' editable={true} style={styles.inputStyle} onChangeText={this.onChangeText}/>
                        <TouchableOpacity onPress={this.showData.bind(this)}>
                            <View style={styles.btn}>
                                <Text style={styles.submit}>提交</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={{width: screenWidth, height: screenHeight, position: 'absolute'}}>*/}
                        {/*<PopupDialog*/}
                            {/*width={0.8}*/}
                            {/*height={200}*/}
                            {/*ref={(popupDialog) => { this.popupDialog = popupDialog; if(store && store.game && !store.game.mention){*/}
                                {/*// alert('游戏规则：sfdsfas');*/}
                                {/*this.popupDialog.show();*/}
                            {/*}}}*/}
                        {/*>*/}
                            {/*<View style={styles.pop}>*/}
                                {/*<Text style={styles.popTitle}>游戏规则</Text>*/}
                                {/*<Text style={styles.popTxt}>*/}
                                    {/*页面上方菱形块内的汉子为本轮游戏关键字，在输入框内输入一句包含关键字的诗句，*/}
                                    {/*若诗句输入正确，则轮到对手回答一句包含关键词的诗句，以此类推，若输入诗句错误，*/}
                                    {/*或超时未输入，则闯关失败！*/}
                                {/*</Text>*/}
                                {/*<TouchableOpacity style={styles.popCloseContainer} onPress={()=>{console.log(this.popupDialog);this.popupDialog.dismiss()}}>*/}
                                    {/*<Text style={styles.popCloseTxt}>关闭并不再提示</Text>*/}
                                    {/*<Text style={styles.popCloseTxt}>(点击页面右上方图标可再次查看游戏规则）</Text>*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                        {/*</PopupDialog>*/}
                    {/*</View>*/}
                </View>)
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
)(Game);

const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrap: {
        alignItems:'center',
        backgroundColor: '#fff',
        height: screenHeight,
    },
    keyWordsContainer: {
        width: 80,
        height: 80,
        transform: [{rotateZ:'45deg'}],
        borderColor: '#666',
        borderWidth: 1,
        top: 45
    },
    keyWords: {
        color: '#000',
        fontSize: 40,
        fontFamily: '华文行楷',
        width: 80,
        height: 80,
        transform: [{rotateZ:'-45deg'}],
        textAlign: 'center',
        lineHeight: 80
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
        // borderRadius: 5,
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
        // borderLeftWidth: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#d4f3d4",
        // color: '#333'
    },
    submit: {
        fontSize: 18,
        fontFamily: '华文行楷',
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
