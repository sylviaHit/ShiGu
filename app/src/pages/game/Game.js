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
            console.log('response', response);
            console.log(this.state.text);
            if (response.ShiData && response.ShiData.length > 0) {
                this.dataAll.push(response.ShiData);
                if(response.ShiData.length === 20){
                    this.pageNo += 1;
                    this.getData();
                }
            }
        });
    }

    componentWillMount() {
        this.dataAll = [];
        // this.getData();
        console.log('this.dataAll', this.dataAll);
    }

    componentWillReceiveProps(nextProps) {
    }


    /**
     * 搜索内容改变
     */
    onChangeText=(inputData)=>{
        this.setState({text: inputData});
    }


    /**
     * 跳转到搜索页
     */
    submit=()=>{
        service.get('https://api.sou-yun.com/api/poem', {key: this.state.text, scope: 3, jsonType: true}).then((response) => {
            console.log('response', response);
            let newData = this.state.data.concat();
            if (response && response.ShiData && response.ShiData.length > 0 && this.state.text.indexOf(this.state.keyWords) !== -1) {
                console.log('行令成功', [...this.state.data]);
                newData.push({
                    sentence: this.state.text,
                    poem: response.ShiData
                });
                this.setState({
                    data: newData
                })
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

    /**
     * 渲染标题
     */
    renderTitle = (poem) => {
        let titles = '';
        if(poem && Array.isArray(poem) && poem[0]){
            let item = poem[0];
            console.log('item.Title.Content', item.Title.Content.split(''));
            if(item.Title && item.Title.Content){
                titles = `《${item.Title.Content.split(' ')[0]}》`;
            }
        }
        return titles;

    }

    /**
     * 渲染诗句
     */
    renderSentence = () => {
        let sentence = [];
        if(this.state.data && Array.isArray(this.state.data)){
            this.state.data.forEach((item, index) => {
                sentence.push(
                    <View key={index} style={styles.container}>
                        <Text style={styles.sentence}>{item.sentence}</Text>
                        <TouchableOpacity onPress={e=>this.goToPoemDetail(e, item.poem[index])}>
                            <Text style={styles.title}>
                                {this.renderTitle(item.poem)}
                            </Text>
                        </TouchableOpacity>

                    </View>
                )
            })
        }
        return sentence;
    }

    /**
     * 跳转到诗词详情页
     */
    goToPoemDetail = (e, item) => {
        console.log('e', e, 'item', item);
        const navigateAction = NavigationActions.navigate({
            routeName: 'PoemDetail',
            params: {
                id: item.Id,
                data: item
            }
        });
        this.props.navigation.dispatch(navigateAction);
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
                        <TouchableOpacity onPress={this.submit}>
                            <View style={styles.btn}>
                                <Text style={styles.submit}>提交</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.bodyContainer}>
                        {this.renderSentence()}
                    </ScrollView>
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
        width: 365,
        marginTop: 20,
        // padding: 10,
        // borderColor:"#00f",
        // borderWidth:1,
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
