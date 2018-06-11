import React, { Component } from 'react'
import { StyleSheet, Switch, Text, View, Platform } from 'react-native'
import { MapView } from 'react-native-amap3d'

export default class ControlsExample extends Component {
    static navigationOptions = {
        title: '地图控件',
    }

    state = {
        showsCompass: false,
        showsScale: true,
        showsZoomControls: true,
        showsLocationButton: false,
    }

    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <View style={styles.controls}>
                    <View style={styles.control}>
                        <Text>指南针</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsCompass => this.setState({ showsCompass })}
                            value={this.state.showsCompass}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text>比例尺</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsScale => this.setState({ showsScale })}
                            value={this.state.showsScale}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text>定位</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsLocationButton => this.setState({ showsLocationButton })}
                            value={this.state.showsLocationButton}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text>缩放</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsZoomControls => this.setState({ showsZoomControls })}
                            value={this.state.showsZoomControls}
                        />
                    </View>
                </View>
                <MapView
                    locationEnabled={this.state.showsLocationButton}
                    showsCompass={this.state.showsCompass}
                    showsScale={this.state.showsScale}
                    showsLocationButton={this.state.showsLocationButton}
                    showsZoomControls={this.state.showsZoomControls}
                    style={styles.map}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        ...Platform.select({
            ios: {
                marginBottom: 72,
            },
        }),
    },
    controls: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
        paddingLeft: 20,
        paddingRight: 20,
        ...Platform.select({
            android: {
                backgroundColor: '#f5f5f5',
            },
            ios: {
                backgroundColor: '#fff',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                borderTopColor: '#e0e0e0',
                borderTopWidth: StyleSheet.hairlineWidth,
                zIndex: 1,
            },
        }),
    },
    control: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
        marginTop: 5,
    },
})