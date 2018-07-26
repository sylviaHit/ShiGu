/**诗词详情页**/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {service} from "../../utils/service";
import {NavigationActions} from "react-navigation";
import Search from './Search';

export default class SearchResult extends Component {
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            id: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.id || 0,
            searchValue: props.navigation && props.navigation.state && props.navigation.state.params && props.navigation.state.params.searchValue || '',
            title: '',
            subTitle: '',
            preface: '',
            content: '',
            showValue: '',
            currentPage: 0,
            currentStartPage: 0,
            data: []
        }
        // 诗词查询输入框
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentWillMount(){
        const { navigation } = this.props;
        let results = [];

        if(this.state.searchValue){
            console.log('222222');
            service.get('https://api.sou-yun.com/api/poem', {key: this.state.searchValue, scope: this.state.initId, pageNo: this.state.currentPage, jsonType: true}).then((response) => {
                console.log('response', response);
                if (response.ShiData && response.ShiData.length > 0) {
                    this.setState({
                        data: [response.ShiData]
                    })
                    this.state.data[this.state.currentPage] = response.ShiData;
                }
            });
        }

    }

    onChangeText=(inputData)=>{
        this.setState({showValue: inputData});
    }

    showData=()=>{
        alert(this.state.showValue);
        let me = this;
        service.get('https://api.sou-yun.com/api/poem', {key: this.state.showValue, jsonType: true}).then((response) => {
            console.log('response', response);
            if (response.ShiData && response.ShiData.length > 0) {
                let data = response.ShiData[0];
                let title = data.Title.Content;
                let subTitle = '（' + data.Dynasty + '.' + data.Author + '）';
                let preface = data.Preface;
                let content = '';
                if(data.Clauses && data.Clauses.length>0){
                    data.Clauses.forEach((item,index)=>{
                        if(index%2 == 1){
                            content += item.Content + '\n';
                        }else{
                            content += item.Content;
                        }
                    });
                }
                me.setState({title: title, preface: preface,content: content,subTitle: subTitle});
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.id || ''
        })
    }

    /**
     * 跳转到诗词详情页
     */
    goToPoemDetail = (e, item) => {
        const navigateAction = NavigationActions.navigate({
            routeName: 'PoemDetail',
            params: {
                id: item.Id,
                data: item
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderResult = () =>{
        const { navigation } = this.props;
        let results = [];
        console.log('this.state', this.state, this.state.data[this.state.currentPage]);
        if(this.state.data && Array.isArray(this.state.data) && this.state.data.length !== 0 && this.state.data[this.state.currentPage]){
            const { ShiData } = this.state.data[this.state.currentPage];
            if(ShiData && Array.isArray(ShiData)){
                ShiData.forEach((item,index)=>{
                    console.log('item.Title', item.Title.Comments);
                    results.push(
                        <TouchableOpacity key={index} onPress={e=>this.goToPoemDetail(e, item)}>
                            <Text style={styles.allTitle}>
                                《{item.Title.Content || ''}》
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        }

        return results;
        // if()
    }

    /**
     * 跳转到上一页
     */
    toLastPage = () => {
        if(this.state.currentPage > 0){
            let currentStartPage = this.state.currentStartPage;
            let currentPage = this.state.currentPage;
            if(currentStartPage === currentPage && currentStartPage > 0){
                currentStartPage = currentStartPage - 1;
            }
            this.setState({
                currentPage: currentPage - 1,
                currentStartPage: currentStartPage
            })
        }
    }

    toNextPage = () => {
        console.log('currentPage', this.state.currentPage)
        if(this.state.currentPage >= 0){
            let currentStartPage = this.state.currentStartPage;
            let currentPage = this.state.currentPage;
            console.log(this.state);
            if(currentStartPage+4 === currentPage){
                currentStartPage = currentStartPage + 1;
            }
            console.log('currentPage', currentPage)
            this.setState({
                currentPage: currentPage + 1,
                currentStartPage: currentStartPage
            })
        }
    }

    /**
     * 跳转到当前点击页
     */
    toPressPage = (e, index) =>{
        this.setState({
            currentPage: index
        })
    }

    /**
     * 渲染分页组件
     * @returns {*}
     */
    renderPages = () => {
        let pages = [];
        for(let i=1;i<=5;i++){
            let style1 = styles.page;
            let style = this.state.currentStartPage+i-1 === this.state.currentPage ? {borderColor: '#fae25d'} : {borderColor: '#ccc'}

            pages.push(
                <TouchableOpacity key={i} onPress={e=>this.toPressPage(e, this.state.currentStartPage+i-1)}>
                    <Text style={[styles.page, style]}>{this.state.currentStartPage+i}</Text>
                </TouchableOpacity>
            )
            console.log('pages', pages);
        }
        return pages;
    }

    render() {
        return (
            <View style={styles.container}>
                <Search navigation={this.props.navigation}/>
                {
                    this.renderResult()
                }
                <View style={styles.pagesContainer}>
                    <TouchableOpacity onPress={this.toLastPage}>
                        <Text style={styles.arrowPage}>上一页</Text>
                    </TouchableOpacity>
                    {
                        this.renderPages()
                    }
                    <TouchableOpacity onPress={this.toNextPage}>
                        <Text style={styles.arrowPage}>下一页</Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // alignItems:'center',
        backgroundColor: 'white'
    },
    allTitle: {
        marginTop: 5,
        textAlign: 'left',
        textDecorationLine: 'underline',
        fontSize: 14
    },
    title: {
        fontSize: 18
    },
    preface: {
        marginTop: 10,
        color: 'red',
        backgroundColor: '#faf1cf',
        fontSize: 12,
        lineHeight:18
    },
    content: {
        marginTop: 10,
        lineHeight:28
    },
    mycontainer:{
        marginTop:30,
        flexDirection:"row",
    },
    inputStyle:{
        width:280,
        height:30,
        borderColor:"black",
        borderWidth:1,
        marginLeft:5,
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
    },
    pagesContainer: {
        flexDirection: 'row'
    },
    arrowPage: {
        width: 60,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        height: 30,
        lineHeight: 30,
        textAlign: 'center'
    },
    page: {
        width: 32,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        height: 30,
        lineHeight: 30,
        textAlign: 'center'
    }
});