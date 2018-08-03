/**诗词详情页**/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button, Alert
} from 'react-native';
import {service} from "../../utils/service";
import {NavigationActions} from "react-navigation";
import Dimensions from 'Dimensions';
import Search from './Search';
import Carousel from 'react-native-snap-carousel';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";

import { transFun } from '../../utils/fontTransform';

const { toSim, toFan } = transFun;

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

    /**
     * 跳转到作者详情页
     */
    goToAuthorResult = (author) => {
        // const {actionCreate, dispatch} = this.props;
        // dispatch(actionCreate('SET_POETRY_SEARCH_VALUE_ITEM', {
        //     searchValue: author,
        //     item: 'author'
        // }));
        let searchValue = author;
        const {store: {poetry: { data}}} = this.props.store;

        let newData = Object.assign({}, data);
        console.log('newData' , newData, newData[searchValue]);

        if (!(newData[searchValue] && newData[searchValue][0])) {
            service.get('https://api.sou-yun.com/api/poem', {
                key: author,
                scope: 'author',
                pageNo: 0,
                jsonType: true
            }).then((response) => {
                //无数据
                if (response === null) {
                    return (
                        Alert.alert('',
                            '无更多数据',
                            [
                                {text: '确定'}
                            ]
                        )
                    )
                }
                if (response.ShiData && response.ShiData.length > 0) {
                    console.log('response' , response);
                    if (newData && newData[searchValue]) {
                        newData[searchValue][0] = response;
                    } else if (newData && !newData[searchValue]) {
                        newData[searchValue] = [];
                        newData[searchValue][0] = response;
                    }
                    const {actionCreate, dispatch} = this.props;
                    dispatch(actionCreate('SET_POETRY_DATA', {
                        data: newData,
                        currentPage: 0,
                        currentStartPage: 0,
                        searchValue: author,
                        item: 'author'
                    }));

                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Result',
                        params: {
                            searchValue: searchValue
                        }
                    });
                    this.props.navigation.dispatch(navigateAction);
                }
            });
        }else if(newData[searchValue] && newData[searchValue][0]){
            console.log('222');
            const navigateAction = NavigationActions.navigate({
                routeName: 'Result',
                params: {
                    searchValue: searchValue
                }
            });
            this.props.navigation.dispatch(navigateAction);
        }
    }

    render() {
        const { navigation } = this.props;
        let id = '', title = '', subTitle = '', preface = '', content = '', author ='', dynasty = '';
        let data;
        if(navigation && navigation.state && navigation.state.params && navigation.state.params.data){
            const data = navigation.state.params.data;
            if(data){
                id = data.Id || '';
                title = data.Title && toSim(data.Title.Content) || '';
                subTitle = data.SubTitle && toSim(data.SubTitle.Content )|| '';
                author = toSim(data.Author) || '';
                preface = toSim(data.Preface) || '' ;
                dynasty = toSim(data.Dynasty) || '';
                if(data.Clauses && data.Clauses.length>0){
                    data.Clauses.forEach((item,index)=>{
                        if(index%2 === 1){
                            content += toSim(item.Content) + '\n';
                        }else{
                            content += toSim(item.Content);
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
                            <View style={{flexDirection: 'row', marginTop: 5}}>
                                {
                                    dynasty ? <Text style={{ fontSize: 12}}>[</Text> : null
                                }
                                {
                                    dynasty ? <Text style={{fontFamily: '华文行楷', fontSize: 16}}>{dynasty}</Text> : null
                                }
                                {
                                    dynasty ? <Text style={{ fontSize: 12}}>]</Text> : null
                                }
                                {
                                    author && author !== '阙名' ?
                                        <TouchableOpacity onPress={e=>this.goToAuthorResult(author, e)}>
                                            <Text style={{textDecorationLine: 'underline', marginLeft: 3, fontFamily: '华文行楷', fontSize: 16}}>
                                                {author}
                                            </Text>
                                        </TouchableOpacity> : null
                                }

                            </View>

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
        textAlign: 'center',
        fontFamily: '华文行楷'
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
        fontFamily: '华文行楷'
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
