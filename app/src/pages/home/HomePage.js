
import React ,{
    Component
}from 'react';
import {Animated, View, Easing, ImageBackground, TouchableOpacity, Dimensions, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {
    actionCreate
} from "../../redux/reducer";
class HomePage extends Component{
    constructor (props) {
        super(props);
        this.state = {
            anim: [1,2,3].map(() => new Animated.Value(0)), // 初始化3个值,
            top: new Animated.Value(0)
        };
    }

    animation = () => {
        this.state.top.setValue(0);
        Animated.timing(this.state.top, {
            toValue: 1, // 目标值
            duration: 30000, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start(()=>this.animation());
    }

    componentDidMount() {
        this.animation();
        // service.get('http://cbdb.fas.harvard.edu/cbdbapi/person.php?name=王安石&o=json',{name:'wang'});
        // service.get('http://cbdb.fas.harvard.edu/cbdbapi/person.php',{name:'王安石',o:'json'});
    }

    render() {
        console.log(this.props);
        let self = this;
        let top = [70, 130, 230];
        let colors = [
            ['#f77695', '#dfe3e4', '#55236a'],
            ['#55843e', '#c5ffa9', '#7898b9'],
            ['#5b5078', '#ffb3f0', '#7484b8'],
            ['#f3b41b', '#f0f32e', '#b9937e'],
            ['#783e3c', '#ff2511', '#88222d']
        ];
        let pages=['Poetry', 'Person', 'Road', 'CultureMap', 'Scene'];
        return (
            <ImageBackground source={require('../../images/poetry-bg-3.jpg')} style={styles.backgroundImage} >
                <Animated.View
                    style={[styles.container
                        , {
                            transform: [
                                {
                                    rotateZ: this.state.top.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['360deg', '0deg']
                                    })
                                },
                            ]
                        }
                    ]}>
                    <Animated.View
                        style={[{top: 40}, {left: 0}, {borderWidth: 0}, {width: 120}, {height: 120}, {
                            transform: [
                                {
                                    rotateZ: this.state.top.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                    })},
                                {
                                    rotateX: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['30deg', '0deg', '30deg']
                                    })
                                },
                                {
                                    rotateY: this.state.top.interpolate({
                                        inputRange: [0,0.4,0.5,0.9,1],
                                        outputRange: ['-18deg', '0deg','-12deg', '-30deg','-18deg']
                                    })
                                }
                            ]
                        }]}>
                        <TouchableOpacity style={styles.linearGradient} onPress={() => {this.props.navigation.navigate(pages[0])}}>
                            <LinearGradient colors={colors[0]} style={[styles.demo]}>
                                <Text>{pages[0]}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[{
                            transform: [
                                {
                                    rotateZ: this.state.top.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                    })},
                                {
                                    rotateX: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['30deg', '0deg', '30deg']
                                    })
                                },
                                {
                                    rotateY: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['-30deg', '0deg', '-30deg']
                                    })
                                }
                            ]
                        },{top: -100+110}, {left: -100}, {borderWidth: 0}, {width: 120}, {height: 120}
                        ]}>
                        <TouchableOpacity style={styles.linearGradient} onPress={() => this.props.navigation.navigate(pages[1])}>
                            <LinearGradient colors={colors[1]} style={styles.demo}>
                                <Text>{pages[1]}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[{
                            transform: [
                                {
                                    rotateZ: this.state.top.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                    })},
                                {
                                    rotateX: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['0deg', '30deg', '0deg']
                                    })
                                },
                                {
                                    rotateY: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['-30deg', '0deg', '-30deg']
                                    })
                                }
                            ]
                        },{top: -240+110}, {left: 100}, {borderWidth: 0}, {width: 120}, {height: 120}
                        ]}>
                        <TouchableOpacity style={styles.linearGradient} onPress={() => this.props.navigation.navigate(pages[2])}>
                            <LinearGradient colors={colors[2]} style={styles.demo}>
                                <Text>{pages[2]}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[{
                            transform: [
                                {
                                    rotateZ: this.state.top.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                    })},
                                {
                                    rotateX: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['0deg', '30deg', '0deg']
                                    })
                                },
                                {
                                    rotateY: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['-30deg', '0deg', '-30deg']
                                    })
                                }
                            ]
                        },{top: -360+240}, {left: -60}, {borderWidth: 0}, {width: 120}, {height: 120}
                        ]}>
                        <TouchableOpacity style={styles.linearGradient} onPress={() => this.props.navigation.navigate(pages[3])}>
                            <LinearGradient colors={colors[3]} style={styles.demo}>
                                <Text>{pages[3]}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View
                        style={[{
                            transform: [
                                {
                                    rotateZ: this.state.top.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg']
                                    })},
                                {
                                    rotateX: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['30deg', '0deg', '30deg']
                                    })
                                },
                                {
                                    rotateY: this.state.top.interpolate({
                                        inputRange: [0,0.5,1],
                                        outputRange: ['-30deg', '0deg', '-30deg']
                                    })
                                }
                            ]
                        },{top: -480+240}, {left: 60}, {borderWidth: 0}, {width: 120}, {height: 120}
                        ]}>
                        <TouchableOpacity style={styles.linearGradient} onPress={() => this.props.navigation.navigate(pages[4])}>
                            <LinearGradient colors={colors[4]} style={styles.demo}>
                                <Text>{pages[4]}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                    <View style={styles.test}>

                    </View>
                </Animated.View>
            </ImageBackground>
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
)(HomePage);

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
        borderRadius: 40,
        shadowColor: '#ccc',
        shadowOffset:  {width: 3, height: 6}
    },
    demo: {
        width: 65,
        height: 65,
        backgroundColor:'transparent',
        borderRadius: 40,
        transform: [{rotateZ:'45deg'}],
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
