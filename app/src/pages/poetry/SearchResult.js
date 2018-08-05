/**诗词详情页**/
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Button
} from 'react-native';
import {service} from "../../utils/service";
import {NavigationActions} from "react-navigation";
import Search from './Search';
import {actionCreate} from "../../redux/reducer";
import {connect} from "react-redux";
import Loading from '../../utils/Loading';

class SearchResult extends Component {
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
            currentPage: 0,
            currentStartPage: 0,
            data: {},
            loading: false
        }
    }

    componentWillMount(){
     }

    getData = (pageNo, currentStartPage) => {
        const { store:{poetry : { searchValue, item, data }} } = this.props.store;
        pageNo = (pageNo !== undefined) ? pageNo : this.state.currentPage;
        currentStartPage = (currentStartPage !== undefined) ? currentStartPage : this.state.currentStartPage;

        let newData = Object.assign({}, data);
        if(newData[searchValue] && newData[searchValue][pageNo]){
            const { actionCreate, dispatch } = this.props;
            dispatch(actionCreate('SET_POETRY_DATA', {
                data: newData,
                currentPage: pageNo,
                currentStartPage: currentStartPage
            } ));
        }else{
            this.setState({
                loading: true
            })
            service.get('https://api.sou-yun.com/api/poem', {key: searchValue, scope: item, pageNo: pageNo || 0, jsonType: true}).then((response) => {

                //无数据
                if(response === null){
                    Alert.alert('',
                        '无更多数据'
                    )
                    this.setState({
                        loading: false
                    })
                }
                if (response.ShiData && response.ShiData.length > 0) {
                    if(newData && newData[searchValue]){
                        newData[searchValue][pageNo] = response;
                    }else if(newData && !newData[searchValue]){
                        newData[searchValue] = [];
                        newData[searchValue][pageNo] = response;
                    }
                    this.setState({
                        loading: false
                    })

                    const { actionCreate, dispatch } = this.props;
                    dispatch(actionCreate('SET_POETRY_DATA', {
                        data: newData,
                        currentPage: pageNo,
                        currentStartPage: currentStartPage
                    } ));
                }
            });
        }
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
                data: item,
                searchValue: this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.searchValue || ''
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderResult = () =>{
        let results = [];
        const { store:{poetry : { searchValue, item, data, currentPage }} } = this.props.store;

        if(data && data[searchValue] && data[searchValue][currentPage]){
            const { ShiData } = data[searchValue][currentPage];

            if(ShiData && Array.isArray(ShiData)){
                ShiData.forEach((item,index)=>{
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
    }

    /**
     * 跳转到上一页
     */
    toLastPage = () => {
        let currentPage = this.props.store.store.poetry.currentPage;
        let currentStartPage = this.props.store.store.poetry.currentStartPage;
        if(currentPage > 0){
            if(currentStartPage === currentPage && currentStartPage > 0){
                currentStartPage = currentStartPage - 1;
            }
            this.getData(currentPage - 1, currentStartPage);
        }
    }

    toNextPage = () => {
        let currentPage = this.props.store.store.poetry.currentPage;
        let currentStartPage = this.props.store.store.poetry.currentStartPage;
        if(currentPage >= 0){
            if(currentStartPage+4 === currentPage){
                currentStartPage = currentStartPage + 1;
            }
            this.getData(currentPage + 1, currentStartPage);
        }
    }

    /**
     * 跳转到当前点击页
     */
    toPressPage = (e, index) =>{
        const { store:{poetry : { currentPage, currentStartPage }} } = this.props.store;
        this.getData(index, currentStartPage);
    }

    renderPagesBottom = () => {
        let pages = [];
        const { store:{poetry : { searchValue, item, data, currentPage }} } = this.props.store;
        if(data && data[searchValue] && data[searchValue][currentPage]){
            const { ShiData } = data[searchValue][currentPage];
            if(ShiData && Array.isArray(ShiData) && ShiData.length >0){
                pages = (
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
                )
            }
        }
        return pages;
    }

    /**
     * 渲染分页组件
     * @returns {*}
     */
    renderPages = () => {
        const { store:{poetry : { searchValue, item, data, currentPage, currentStartPage }} } = this.props.store;
        let pages = [];
        for(let i=1;i<=5;i++){
            let style1 = styles.page;
            let style = currentStartPage+i-1 === currentPage ? {borderColor: '#fae25d'} : {borderColor: '#ccc'}
            pages.push(
                <TouchableOpacity key={i} onPress={e=>this.toPressPage(e, currentStartPage+i-1)}>
                    <Text style={[styles.page, style]}>{currentStartPage+i}</Text>
                </TouchableOpacity>
            )
        }
        return pages;
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading ?
                        <Loading/> : null
                }
                <Search
                    navigation={this.props.navigation}
                    onChage={this.onChangeText}
                    onGetData={this.getData}
                    value={this.state.searchValue || ''}
                />
                <ScrollView style={styles.bodyContainer}>
                    <View style={{ minHeight: 500 }}>
                        {
                            this.renderResult()
                        }
                    </View>
                    {
                        this.renderPagesBottom()
                    }
                </ScrollView>
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
)(SearchResult);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingLeft: 20,
        // paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    bodyContainer:{
        paddingLeft: 20,
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
    pagesContainer: {
        flexDirection: 'row',
        marginTop: 10
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