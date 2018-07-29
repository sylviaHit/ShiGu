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

class Result extends Component {
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
            data: {}
        }
    }

    componentWillMount(){
        console.log('111111111111')
        const { navigation } = this.props;
        let results = [];

        const { store:{poetry : { searchValue, item }} } = this.props.store;
        if(searchValue){
            service.get('https://api.sou-yun.com/api/poem', {key: searchValue, scope: item, pageNo: this.state.currentPage, jsonType: true}).then((response) => {
                let newData = Object.assign({}, this.state.data);

                if(newData && newData[searchValue]){
                    newData[searchValue][this.state.currentPage] = response;
                }else if(newData && !newData[searchValue]){
                    newData[searchValue] = [];
                    newData[searchValue][this.state.currentPage] = response;
                }

                if (response.ShiData && response.ShiData.length > 0) {
                    this.setState({
                        data: newData
                    })
                }
            });
        }

    }

    getData = (pageNo, currentStartPage) => {
        const { store:{poetry : { searchValue, item }} } = this.props.store;
        pageNo = (pageNo !== undefined) ? pageNo : this.state.currentPage;
        currentStartPage = (currentStartPage !== undefined) ? currentStartPage : this.state.currentStartPage;

        let newData = Object.assign({}, this.state.data);
        if(newData[searchValue] && newData[searchValue][pageNo] && Array.isArray(newData[searchValue][pageNo])){
            this.setState({
                currentPage: pageNo,
                currentStartPage: currentStartPage
            })
        }else{
            service.get('https://api.sou-yun.com/api/poem', {key: searchValue, scope: item, pageNo: pageNo || 0, jsonType: true}).then((response) => {

                //无数据
                if(response === null){
                    return (
                        Alert.alert('',
                            '无更多数据'
                        )
                    )
                }
                if (response.ShiData && response.ShiData.length > 0) {
                    if(newData && newData[searchValue]){
                        newData[searchValue][pageNo] = response;
                    }else if(newData && !newData[searchValue]){
                        newData[searchValue] = [];
                        newData[searchValue][pageNo] = response;
                    }
                    this.setState({
                        data: newData,
                        currentPage: pageNo,
                        currentStartPage: currentStartPage
                    })
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
        const { data } = this.state;
        const { store:{poetry : { searchValue, item }} } = this.props.store;
        if(data && data[searchValue] && data[searchValue][this.state.currentPage]){
            const { ShiData } = data[searchValue][this.state.currentPage];
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
        if(this.state.currentPage > 0){
            let currentStartPage = this.state.currentStartPage;
            let currentPage = this.state.currentPage;
            if(currentStartPage === currentPage && currentStartPage > 0){
                currentStartPage = currentStartPage - 1;
            }
            this.getData(currentPage - 1, currentStartPage);
        }
    }

    toNextPage = () => {
        if(this.state.currentPage >= 0){
            let currentStartPage = this.state.currentStartPage;
            let currentPage = this.state.currentPage;
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
        this.getData(index, this.state.currentStartPage);
    }

    renderPagesBottom = () => {
        let pages = [];
        const { data } = this.state;
        const { store:{poetry : { searchValue, item }} } = this.props.store;
        if(data && data[searchValue] && data[searchValue][this.state.currentPage]){
            const { ShiData } = data[searchValue][this.state.currentPage];
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
        let pages = [];
        for(let i=1;i<=5;i++){
            let style1 = styles.page;
            let style = this.state.currentStartPage+i-1 === this.state.currentPage ? {borderColor: '#fae25d'} : {borderColor: '#ccc'}

            pages.push(
                <TouchableOpacity key={i} onPress={e=>this.toPressPage(e, this.state.currentStartPage+i-1)}>
                    <Text style={[styles.page, style]}>{this.state.currentStartPage+i}</Text>
                </TouchableOpacity>
            )
        }
        return pages;
    }

    render() {
        return (
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
)(Result);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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