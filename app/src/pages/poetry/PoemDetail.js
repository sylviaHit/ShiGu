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

export default class PoemDetail extends Component {
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

    componentWillMount() {
        this.getPoemDetail(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.navigation && nextProps.navigation.state && nextProps.navigation.state.params && nextProps.navigation.state.params.id || 0,
        })
    }

    getPoemDetail = (id) => {
        let me = this;
        service.get('https://api.sou-yun.com/api/poem', {key: id, jsonType: true}).then((response) => {
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
    };

    onChangeText=(inputData)=>{
        this.setState({showValue: inputData});
    }

    showData=()=>{
        alert(this.state.showValue);
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

    render() {
        let me = this;
        const {id, title, subTitle, preface, content,} = me.state;
        let inputTag = <TextInput placeholder='请输入想查询的关键字' editable={true} style={styles.inputstyle} onChangeText={this.onChangeText}></TextInput>;
        let touchableTag = <TouchableOpacity onPress={this.showData.bind(this)}><View style={styles.btn}><Text style={styles.wordc}>搜索</Text></View></TouchableOpacity>
        return (
            id ?<View style={styles.container}>{inputTag}{touchableTag}<Text Style={styles.allTitle}><Text style={styles.title}>{title}</Text><Text>{subTitle}</Text></Text><Text style={styles.preface}>{preface}</Text><Text style={styles.content}>{content}</Text>
            </View>:<View style={styles.container}><Text style={{marginTop: 10}}>暂无数据</Text></View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems:'center',
        backgroundColor: 'white'
    },
    allTitle: {
        marginTop: 10
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