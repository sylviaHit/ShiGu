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

export default class SearchResult extends Component {
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
    }

    onChangeText=(inputData)=>{
        this.setState({showValue: inputData});
    }

    showData=()=>{
        alert(this.state.showValue);
        let me = this;
        service.get('https://api.sou-yun.com/api/poem', {key: this.state.showValue, jsonType: true}).then((response) => {
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
        if(navigation && navigation.state && navigation.state.params && navigation.state.params.result){
            const result = navigation.state.params.result;
            const { ShiData } = result;
            if(ShiData && Array.isArray(ShiData)){
                ShiData.forEach((item,index)=>{
                    results.push(
                        <TouchableOpacity key={index} onPress={e=>this.goToPoemDetail(e, item)}>
                            <Text Style={styles.allTitle}>
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

    render() {
        let me = this;

        // let data = response.ShiData[0];
        // let title = data.Title.Content;
        // let subTitle = '（' + data.Dynasty + '.' + data.Author + '）';
        // let preface = data.Preface;
        // let content = '';
        // if(data.Clauses && data.Clauses.length>0){
        //     data.Clauses.forEach((item,index)=>{
        //         if(index%2 == 1){
        //             content += item.Content + '\n';
        //         }else{
        //             content += item.Content;
        //         }
        //
        //     });
        // }
        // me.setState({title: title, preface: preface,content: content,subTitle: subTitle});


        const {id, title, subTitle, preface, content,} = me.state;
        let inputTag = <TextInput placeholder='请输入想查询的关键字' editable={true} style={styles.inputStyle} onChangeText={this.onChangeText}/>;
        let touchableTag = <TouchableOpacity onPress={this.showData.bind(this)}><View style={styles.btn}><Text style={styles.wordC}>搜索</Text></View></TouchableOpacity>
        return (
            <View style={styles.container}>{inputTag}{touchableTag}
                {
                    this.renderResult()
                }
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
        marginTop: 10,
        textAlign: 'left'
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
    }
});