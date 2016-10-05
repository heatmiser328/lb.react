'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var SpinButton = require('./spinButton');

var SpinSelect = React.createClass({
    render() {
        return (
            <View style={{flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                {this.props.label
                    ? <View style={{flex: 10}}>
                        <Text>{this.props.label}</Text>
                    </View>
                    : null
                }
                <View style={{flex: 5}}>
                    <SpinButton size={32} direction={'prev'} onPress={this.props.onPrev} />
                </View>
                <View style={{flex: 60, alignItems: 'center'}}>
                    <Text style={{alignSelf: 'stretch', fontSize: 18, justifyContent: 'center', textAlign: 'center'}}>
                        {this.props.value}
                    </Text>
                </View>
                <View style={{flex: 5}}>
                    <SpinButton size={32} direction={'next'} onPress={this.props.onNext} />
                </View>
            </View>
        );
    }
});

module.exports = SpinSelect;
