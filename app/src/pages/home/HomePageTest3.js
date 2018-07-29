
import React ,{
    Component
}from 'react';
import {Animated, View, Easing, Image, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";
class HomePageTest3 extends Component{
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor (props) {
        super(props);
        this.state = {
        };
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }

    componentDidMount() {
    }

    render() {
        let pages=['Poetry', 'Person', 'Game', 'CultureMap', 'Scene'];
        let colors = [
            ['#f77695', '#dfe3e4', '#55236a'],
            ['#55843e', '#c5ffa9', '#7898b9'],
            ['#5b5078', '#ffb3f0', '#7484b8'],
            ['#f3b41b', '#f0f32e', '#b9937e'],
            ['#783e3c', '#ff2511', '#88222d']
        ];
        const sizeArrW = [ this.screenWidth/20*1,this.screenWidth/20*2,this.screenWidth/20*3,this.screenWidth/20*4,this.screenWidth/20*5
            ,this.screenWidth/20*6,this.screenWidth/20*7,this.screenWidth/20*8,this.screenWidth/20*9,this.screenWidth/20*10
            ,this.screenWidth/20*11,this.screenWidth/20*12,this.screenWidth/20*13,this.screenWidth/20*14,this.screenWidth/20*15
            ,this.screenWidth/20*16,this.screenWidth/20*17,this.screenWidth/20*18,this.screenWidth/20*19,this.screenWidth/20*20];
        const sizeArrH = [ this.screenHeight/20*1,this.screenHeight/20*2,this.screenHeight/20*3,this.screenHeight/20*4,this.screenHeight/20*5
            ,this.screenHeight/20*6,this.screenHeight/20*7,this.screenHeight/20*8,this.screenHeight/20*9,this.screenHeight/20*10
            ,this.screenHeight/20*11,this.screenHeight/20*12,this.screenHeight/20*13,this.screenHeight/20*14,this.screenHeight/20*15
            ,this.screenHeight/20*16,this.screenHeight/20*17,this.screenHeight/20*18,this.screenHeight/20*19,this.screenHeight/20*20];
        return (
            <View style={{width: this.screenWidth, height: this.screenHeight, backgroundColor: '#fff', alignItems: 'center'}}>
                <View style={{position: 'absolute', width: 100, height: 100,alignItems:'center', top: 30,borderWidth:1,borderColor:'white',borderLeftColor: 'transparent', borderRightColor:'transparent'}}>
                    <View style={{position: 'absolute', width: 100, height: 98,borderColor: '#eee', borderWidth:0, borderRadius:50, overflow: 'hidden'}}>
                        <Image source={require('../../images/logo.png')}  style={{ top: 10, left: 10, width: 80, height: 80}}/>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={[styles.block, {left: 15, top:20}]}>
                        <ImageBackground source={require('../../images/book7.jpg')} style={{width: 78,height: 78}}/>
                    </View>
                    <View style={[styles.block, {left: 145, top:20, backgroundColor: '#ebebeb'}]}>
                        <TouchableOpacity
                            style={styles.blockTouch}
                            onPress={() => {this.props.navigation.navigate(pages[0])}}>
                            <Text style={styles.title}>诗词</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.block, {left: 80, top:85, backgroundColor: '#e2e2e2'}]}>
                        <TouchableOpacity
                            style={styles.blockTouch}
                            onPress={() => {this.props.navigation.navigate(pages[1])}}>
                            <Text style={styles.title}>人文</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.block, {left: 145, top:150}]}>
                        <ImageBackground source={require('../../images/book4.jpg')} style={{width: 78,height: 78}}/>
                    </View>
                    <View style={[styles.block, {left: 80, top:215, backgroundColor: '#d8d8d8'}]}>
                        <TouchableOpacity
                            style={styles.blockTouch}
                            onPress={() => {this.props.navigation.navigate(pages[2])}}>
                            <Text style={[styles.title, {fontSize: 26, position: 'absolute', top: 12, left: -2}]}>诗词</Text>
                            <Text style={[styles.title, {fontSize: 26, position: 'absolute', top: 32, left: 6}]}>大闯关</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.block, {left: 145, top:280}]}>
                        <ImageBackground source={require('../../images/book6.jpg')} style={{width: 78,height: 78}}/>
                    </View>
                    <View style={[styles.block, {left: 80, top:345}]}>
                        <ImageBackground source={require('../../images/book5.jpg')} style={{width: 78,height: 78}}/>
                    </View>
                    <View style={[styles.block, {left: 210, top:345, backgroundColor: '#cecece'}]}>
                        <TouchableOpacity
                            style={styles.blockTouch}
                            onPress={() => {this.props.navigation.navigate(pages[3])}}>
                            <Text style={[styles.title, {fontSize: 26, position: 'absolute', top: 12, left: -2}]}>探寻</Text>
                            <Text style={[styles.title, {fontSize: 26, position: 'absolute', top: 32, left: 6}]}>武康路</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
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
)(HomePageTest3);
const screenWidth = Dimensions.get('window').width;
const screenHeight =  Dimensions.get('window').height;
const styles = StyleSheet.create({
    backgroundImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor:'rgba(0,0,0,0)',
    },
    wrap: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        width: 500,
        height: 400,
        alignItems: 'center',
    },
    linearGradient: {
        width: 65,
        height: 65,
        backgroundColor:'transparent',
        // borderRadius: 40,
        shadowColor: '#ccc',
        shadowOffset:  {width: 3, height: 6}
    },
    demo: {
        width: 65,
        height: 65,
        backgroundColor:'transparent',
        // borderRadius: 40,
        // transform: [{rotateZ:'45deg'}],
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        transform: [{rotateZ:'-45deg'}],
    },
    test: {
        width: 65,
        height: 65,
        backgroundColor:'#504488',
        borderRadius: 40,
        transform: [{rotateZ:'45deg'}],
        opacity : 1,
        borderWidth:2,
        borderColor: '#fff',
        shadowColor:'white',
        shadowOffset:{h:10,w:10},
        shadowRadius:3,
        shadowOpacity:0.8,
    },
    text: {
        fontSize: 30
    },
    bottom: {
        width: 300,
        height: 520,
        top: 160
    },
    block: {
        transform: [{rotateZ:'45deg'}],
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor:'#fff',
        width: 80,
        height: 80
    },
    blockTouch: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80
    },
    title: {
        color: '#000',
        transform: [{rotateZ:'-45deg'}],
        fontSize: 30,
        fontFamily: '华文行楷',
    }
});





