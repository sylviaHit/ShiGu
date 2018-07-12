
import React ,{
    Component
}from 'react';
import {Animated, View, Easing, Image, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";
class HomePageTest extends Component{
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
        let pages=['Poetry', 'Person', 'Road', 'CultureMap', 'Scene'];
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
            <View style={{width: this.screenWidth, height: this.screenHeight, backgroundColor: '#fff'}}>

                <View style={{position: 'absolute', width: this.screenWidth, height: sizeArrW[3],alignItems:'center', top: 30,borderWidth:1,borderColor:'white',borderLeftColor: 'transparent', borderRightColor:'transparent'}}>
                    <View style={{position: 'absolute', width: sizeArrW[3], height: sizeArrW[3],borderRadius:20, overflow: 'hidden'}}>
                        <Image source={require('../../images/bird.jpg')}  style={{ width: 100, height: 100}}/>
                    </View>
                </View>
                {/*<View style={{width: sizeArrW[7], height: sizeArrH[3], position: 'absolute', left: sizeArrW[11], top:sizeArrH[6], backgroundColor: '#343434'}}>*/}
                    {/*<View style={{width: sizeArrW[2], height: sizeArrW[1], position: 'absolute', left: sizeArrW[4],  backgroundColor: '#757575'}}/>*/}
                    {/*<View style={{width: sizeArrW[2], height: sizeArrW[0], position: 'absolute', left: sizeArrW[3], top:sizeArrW[1], backgroundColor: '#757575'}}/>*/}
                    {/*<View style={{width: sizeArrW[1], height: sizeArrW[1], position: 'absolute', left: sizeArrW[1], top:sizeArrW[3], backgroundColor: '#757575'}}/>*/}
                {/*</View>*/}
                {/*<View style={{width: sizeArrW[5], height: sizeArrH[2], position: 'absolute', left: sizeArrW[5], top:sizeArrH[0], backgroundColor: '#fffs'}}>*/}
                    {/*<View style={{width: sizeArrW[1], height: sizeArrH[1], position: 'absolute', left: sizeArrW[0], top:sizeArrH[0], backgroundColor: '#343434'}}/>*/}
                    {/*<View style={{width: sizeArrW[4], height: sizeArrH[1], position: 'absolute', left: sizeArrW[1], top:0, backgroundColor: '#343434'}}>*/}
                        {/*<View style={{width: sizeArrW[0], height: sizeArrH[0], top:sizeArrH[0], backgroundColor: '#757575', zIndex: 10}}/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <View style={{width: sizeArrW[6], height: sizeArrH[2], position: 'absolute', left: sizeArrW[4], top:sizeArrH[13], backgroundColor: '#fff'}}>
                    <View style={{width: sizeArrW[3], height: sizeArrH[1], position: 'absolute', left: sizeArrW[2], top:sizeArrH[0], backgroundColor: '#fff7c4'}}/>
                    <View style={{width: sizeArrW[4], height: sizeArrH[1], position: 'absolute', left: 0, top:0, backgroundColor: '#ffd48a'}}>
                        {/*<View style={{width: sizeArrW[1], height: sizeArrH[0], left: sizeArrW[2], top:sizeArrH[0], backgroundColor: '#ffffff', zIndex: 10}}/>*/}
                    </View>
                </View>
                <View style={{width: sizeArrW[7], height: sizeArrH[3], position: 'absolute', left: sizeArrW[11], top:sizeArrH[6], backgroundColor: '#fff'}}>
                    <View style={{width: sizeArrW[2], height: sizeArrH[1], position: 'absolute', left: sizeArrW[4], top:0, backgroundColor: '#fff7c4'}}/>
                    <View style={{width: sizeArrW[2], height: sizeArrH[0], position: 'absolute', left: 0, top:sizeArrH[1], backgroundColor: '#ffed90'}}/>
                    <View style={{width: sizeArrW[3], height: sizeArrH[2], position: 'absolute', left: sizeArrW[1], top:sizeArrH[0], backgroundColor: '#fff7c4'}}>
                        {/*<View style={{width: sizeArrW[0], height: sizeArrH[0], left: sizeArrW[2], top:0, position: 'absolute',backgroundColor: '#ffffff', zIndex: 10}}/>*/}
                        {/*<View style={{width: sizeArrW[0], height: sizeArrH[0], left: 0, top:sizeArrH[0], position: 'absolute',backgroundColor: '#ffffff', zIndex: 10}}/>*/}
                    </View>
                </View>
                <View style={{width: sizeArrW[2], height: sizeArrH[1], position: 'absolute', left: sizeArrW[1], top:sizeArrH[6], backgroundColor: '#fff7c4'}}/>
                {/*<View style={{width: sizeArrW[2], height: sizeArrH[0], position: 'absolute', left: sizeArrW[2], top:sizeArrH[16], backgroundColor: '#343434'}}/>*/}
                <View style={{width: sizeArrW[1], height: sizeArrH[0], position: 'absolute', left: sizeArrW[2], top:sizeArrH[3], backgroundColor: '#fff7c4'}}/>
                {/*<TouchableOpacity  style={{position: 'absolute', left: sizeArrW[11], top:sizeArrH[2]}} onPress={() => {this.props.navigation.navigate(pages[0])}}>*/}
                    {/*<LinearGradient colors={colors[0]} style={{width: sizeArrW[5], height: sizeArrH[2],backgroundColor:'transparent'}}>*/}
                        {/*<Text>{pages[0]}</Text>*/}
                    {/*</LinearGradient>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={{position: 'absolute', left: sizeArrW[2], top:sizeArrH[11]}} onPress={() => {this.props.navigation.navigate(pages[1])}}>*/}
                    {/*<LinearGradient colors={colors[1]} style={{width: sizeArrW[5], height: sizeArrH[2],backgroundColor:'transparent'}}>*/}
                        {/*<Text>{pages[1]}</Text>*/}
                    {/*</LinearGradient>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={{position: 'absolute', left: sizeArrW[13], top:sizeArrH[13]}} onPress={() => {this.props.navigation.navigate(pages[2])}}>*/}
                    {/*<LinearGradient colors={colors[2]} style={{width: sizeArrW[4], height: sizeArrH[2],backgroundColor:'transparent'}}>*/}
                        {/*<Text>{pages[2]}</Text>*/}
                    {/*</LinearGradient>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={{position: 'absolute', left: sizeArrW[5], top:sizeArrH[6]}} onPress={() => {this.props.navigation.navigate(pages[3])}}>*/}
                    {/*<LinearGradient colors={colors[3]} style={{width: sizeArrW[4], height: sizeArrH[2],backgroundColor:'transparent'}}>*/}
                        {/*<Text>{pages[3]}</Text>*/}
                    {/*</LinearGradient>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity style={{position: 'absolute', left: sizeArrW[11], top:sizeArrH[2],backgroundColor:'#ffffe6',width: sizeArrW[4], height: sizeArrH[2]}} onPress={() => {this.props.navigation.navigate(pages[0])}}>
                        <Text>{pages[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', left: sizeArrW[2], top:sizeArrH[11],backgroundColor:'#fbffcc',width: sizeArrW[4], height: sizeArrH[2]}} onPress={() => {this.props.navigation.navigate(pages[1])}}>
                        <Text>{pages[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', left: sizeArrW[13], top:sizeArrH[13],backgroundColor:'#ffee94',width: sizeArrW[4], height: sizeArrH[2]}} onPress={() => {this.props.navigation.navigate(pages[2])}}>
                        <Text>{pages[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', left: sizeArrW[5], top:sizeArrH[6],backgroundColor:'#ffd48a',width: sizeArrW[4], height: sizeArrH[2]}} onPress={() => {this.props.navigation.navigate(pages[3])}}>
                        <Text>{pages[3]}</Text>
                </TouchableOpacity>
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
)(HomePageTest);

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
    }
});
