'use strict';

var React = require('react');
import { View, Image, Text, TouchableOpacity } from 'react-native';
var Icons = require('../res/icons');
var log = require('../services/log');

var NavMenuItem = React.createClass({
    onPress() {
        this.props.onPress && this.props.onPress(this.props.name);
    },
    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1,backgroundColor: '#fff'}}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                        backgroundColor: '#eaeaea',
                        borderRadius: 3
                    }}>
                        <Image style={{
                            //flex: 1,
                            //width: null,
                            //height: null,
                            width: 64,
                            height: 96,
                            resizeMode: 'contain',
                            //backgroundColor: 'transparent',
                        }} source={Icons[this.props.image]} />
                        <Text style={{fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = NavMenuItem;
