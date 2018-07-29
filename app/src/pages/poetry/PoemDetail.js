/**诗词详情页**/
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
import {service} from "../../utils/service";
import {NavigationActions} from "react-navigation";
import Dimensions from 'Dimensions';
import Search from './Search';
import Carousel from 'react-native-snap-carousel';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";

class PoemDetail extends Component {
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.id || 0,
            title: '',
            subTitle: '',
            preface: '',
            content: '',
            searchValue: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.searchValue || ''
        }
        // 诗词查询输入框
        this.onChangeText = this.onChangeText.bind(this);
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }

    componentWillMount() {
    }

    /**
     * 搜索内容改变
     */
    onChangeText=(inputData)=>{
        this.setState({searchValue: inputData});
    }

    /**
     * 跳转到搜索页
     */
    showData=()=>{
        let me = this;
        service.get('https://api.sou-yun.com/api/poem', {key: this.state.searchValue, jsonType: true}).then((response) => {
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
     * 轮播图渲染
     */
    _renderItem = ({item, index}) => {
        let me = this;
        const { navigation } = this.props;
        let id = '', title = '', subTitle = '', preface = '', content = '', author ='', dynasty = '';
        if(navigation && navigation.state && navigation.state.params && navigation.state.params.data){
            const data = navigation.state.params.data;
            if(data){
                id = data.Id || '';
                title = data.Title && data.Title.Content || '';
                subTitle = data.SubTitle && data.SubTitle.Content || '';
                author = data.Author || '';
                preface = data.Preface || '' ;
                dynasty = data.Dynasty || '';
                if(data.Clauses && data.Clauses.length>0){
                    data.Clauses.forEach((item,index)=>{
                        if(index%2 === 1){
                            content += item.Content + '\n';
                        }else{
                            content += item.Content;
                        }

                    });
                }
            }
        }
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={e=>this._onInfoWindowPress(e, item)}>
                <View style={styles.container}>
                    <Text style={styles.allTitle}>
                        {title}{subTitle ? `·${subTitle}` : ''}
                    </Text>
                    <Text>{dynasty ? `[${dynasty}]` : ''}  {author}</Text>
                    { preface ? <Text style={styles.preface}>{preface}</Text> : null }
                    <Text style={styles.content}>{content}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchValue: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.searchValue || ''
        })
    }

    render() {
        let me = this;
        const { navigation } = this.props;
        let id = '', title = '', subTitle = '', preface = '', content = '', author ='', dynasty = '';
        let data;
        if(navigation && navigation.state && navigation.state.params && navigation.state.params.data){
            const data = navigation.state.params.data;
            if(data){
                id = data.Id || '';
                title = data.Title && data.Title.Content || '';
                subTitle = data.SubTitle && data.SubTitle.Content || '';
                author = data.Author || '';
                preface = data.Preface || '' ;
                dynasty = data.Dynasty || '';
                if(data.Clauses && data.Clauses.length>0){
                    data.Clauses.forEach((item,index)=>{
                        if(index%2 === 1){
                            content += item.Content + '\n';
                        }else{
                            content += item.Content;
                        }

                    });
                }
            }
        }

        return (
            id ?
                <View style={styles.wrap}>
                    <Search
                        navigation={this.props.navigation}
                        onChage={this.onChangeText}
                        value={this.state.searchValue || ''}/>
                    <ScrollView style={styles.bodyContainer}>
                        <View style={styles.container}>
                            <Text style={styles.allTitle}>
                                {title}{subTitle ? `·${subTitle}` : ''}
                            </Text>
                            <Text style={{ marginTop: 5 }}>{dynasty ? `[${dynasty}]` : ''}  {author}</Text>
                            { preface ? <Text style={styles.preface}>{preface}</Text> : null }
                            <Text style={styles.content}>{content}</Text>
                        </View>
                    </ScrollView>
                </View>
                :
                <View style={styles.container}>
                    <Text style={{marginTop: 10,
                        fontFamily: '华文行楷'}}>暂无数据</Text>
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
)(PoemDetail);

const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;

const styles = StyleSheet.create({
    wrap: {
        alignItems:'center',
        backgroundColor: '#fff',
        height: screenHeight,
    },
    search: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bodyContainer: {
        width: screenWidth,
        padding: 0,
    },
    container: {
        width: screenWidth,
        padding: 0,
        alignItems:'center',
        backgroundColor: 'white'
    },
    allTitle: {
        marginTop: 10,
        fontSize: 20,
        width: 300,
        textAlign: 'center'
    },
    title: {
        fontSize: 18,
        width: 100,
        borderColor:"black",
        borderWidth:1,
    },
    preface: {
        width: screenWidth-60,
        padding: 3,
        marginTop: 10,
        color: '#f00',
        borderRadius: 5,
        backgroundColor: '#faf1cf',
        fontSize: 12,
        lineHeight:18
    },
    content: {
        marginTop: 10,
        lineHeight:28,
        fontSize: 16,
    },
    myContainer:{
        marginTop:30,
        flexDirection:"row",
    },
    inputStyle:{
        width:280,
        height:40,
        borderColor:"black",
        borderWidth:1,
        marginLeft:5,
        fontSize: 12,
        fontFamily: '华文行楷'
    },
    btn:{
        width:85,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"green",
    },
    wordC:{
        color:"white",
        fontSize:18,
        fontFamily: '华文行楷'
    }
});
