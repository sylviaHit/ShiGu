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

export default class PoemDetail extends Component {
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
            showValue: ''
        }
        // 诗词查询输入框
        this.onChangeText = this.onChangeText.bind(this);
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }

    componentWillMount() {
    }

    onChangeText=(inputData)=>{
        this.setState({showValue: inputData});
    }

    /**
     * 跳转到搜索页
     */
    showData=()=>{
        let me = this;
        console.log('me', me);
        service.get('https://api.sou-yun.com/api/poem', {key: this.state.showValue, jsonType: true}).then((response) => {
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

    componentWillReceiveProps(nextProps) {
        // this.getPoemDetail(this.state.id);
        // this.setState({
        //     id: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.id || ''
        // })
    }

    /**
     * 轮播图渲染
     */
    _renderItem = ({item, index}) => {
        let me = this;
        const { navigation } = this.props;
        let id = '', title = '', subTitle = '', preface = '', content = '', author ='', dynasty = '';
        if(navigation && navigation.state && navigation.state.params && navigation.state.params.data){
            console.log('2222222');
            const data = navigation.state.params.data;
            console.log('data', data);
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
                    <Text Style={styles.allTitle}>
                        <Text style={styles.title}>{title}{subTitle ? `·${subTitle}` : ''}</Text>
                    </Text>
                    <Text style={{fontFamily: '华文行楷'}}>{dynasty ? `[${dynasty}]` : ''}  {author}</Text>
                    { preface ? <Text style={styles.preface}>{preface}</Text> : null }
                    <Text style={styles.content}>{content}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        let me = this;
        const { navigation } = this.props;
        let id = '', title = '', subTitle = '', preface = '', content = '', author ='', dynasty = '';
        let data;
        if(navigation && navigation.state && navigation.state.params && navigation.state.params.data){
            console.log('2222222');
            data = navigation.state.params.data;
            console.log('data', data);
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
        console.log('data', data);

        return (
            id ?
                <View style={styles.wrap}>
                    <Search navigation={this.props.navigation}/>
                    <ScrollView style={styles.bodyContainer}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            currentIndex={this.state.currentIndex}
                            data={[data]}
                            renderItem={this._renderItem}
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth}
                            layout={'default'}
                            firstItem={this.state.currentIndex}
                            onSnapToItem = {this.onSnapToItem}
                        />
                    </ScrollView>
                </View>
                :
                <View style={styles.container}>
                    <Text style={{marginTop: 10,
                        fontFamily: '华文行楷'}}>暂无数据</Text>
                </View>)
    }
}

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
        fontFamily: '华文行楷'
    },
    title: {
        fontSize: 18,
        fontFamily: '华文行楷'
    },
    preface: {
        width: screenWidth-60,
        padding: 3,
        marginTop: 10,
        color: '#f00',
        borderRadius: 5,
        backgroundColor: '#faf1cf',
        fontSize: 12,
        fontFamily: '华文行楷',
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
        // borderRadius:5
    },
    wordC:{
        color:"white",
        fontSize:18,
        fontFamily: '华文行楷'
    }
});
