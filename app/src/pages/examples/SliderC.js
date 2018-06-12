import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import Dimensions from 'Dimensions';
import Carousel from 'react-native-snap-carousel';
export default class MyCarousel extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 4,
            entries : [
                {
                    title: 'Favourites landscapes 1',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
                },
                {
                    title: 'Favourites landscapes 2',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
                },
                {
                    title: 'Favourites landscapes 3',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat',
                    illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
                },
                {
                    title: 'Favourites landscapes 4',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/cA8zoGel.jpg'
                },
                {
                    title: 'Favourites landscapes 5',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/pewusMzl.jpg'
                },
                {
                    title: 'Favourites landscapes 6',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat',
                    illustration: 'https://i.imgur.com/l49aYS3l.jpg'
                }
            ]
        }
        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight =  Dimensions.get('window').height;
    }
    _renderItem = ({item, index}) => {
        console.log('index', index);
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
                <Image style={styles.image} source={{ uri: item.illustration }}/>
            </View>
        );
    }

    render () {
        return (
            <View style={styles.container}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    currentIndex={this.state.currentIndex}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={this.screenWidth}
                    itemWidth={this.screenWidth}
                    layout={'default'}
                    firstItem={3}
                    onSnapToItem = {(slideIndex)=>{
                        console.log('slideIndex', slideIndex)
                    }}
                />
            </View>


        );
    }
}
const absoluteFillObject = {
    position: ('absolute': 'absolute'),
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};
const styles =  StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slide:{
        width: this.screenWidth-30,
        height:300,
    },
    title: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        width:this.screenWidth,
        height:500,
        resizeMode: 'cover',
        borderRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
});