'use strict';

var React = require('react');
import { View, TouchableOpacity, Text, Image } from 'react-native';
var Icons = require('../res/icons');

var RadioButton = React.createClass({
    render() {
        let icon = this.props.selected ? 'radio-on' : 'radio-off';        
        return (
            <TouchableOpacity onPress={this.props.onSelected}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
                    {this.props.labelpos == 'left' ? this.renderLabel(this.props.label) : null}
                    <Image
                        style={{marginTop: 5, marginLeft: 5, marginRight: 5, width: 24, height: 24, resizeMode: 'contain'}}
                        source={Icons[icon]} />
                    {this.props.labelpos != 'left' ? this.renderLabel(this.props.label) : null}
                </View>
            </TouchableOpacity>
        );
    },
    renderLabel(label) {
        return (<Text style={{fontSize: 14, textAlign: 'left'}}>{label}</Text>)
    }
});

module.exports = RadioButton;
