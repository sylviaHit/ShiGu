/**诗词游戏**/
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
import Carousel from 'react-native-snap-carousel';

export default class Game extends Component {
    static navigationOptions = {
        title: '',
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
                <View style={styles.wrap}>
                    <View>
                        <Text style={styles.keyWords}>人</Text>
                    </View>
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
    keyWords: {
        color: '#000',
        fontSize: 40,
        fontFamily: '华文行楷'
    }
});
