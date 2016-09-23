'use strict';

var React = require('react');
import { View, Text, ScrollView } from 'react-native';
var RadioButton = require('./radioButton');

var RadioButtonGroup = React.createClass({
    onSelected(b) {
        return () => {
            this.props.onSelected && this.props.onSelected(b.value);
        }
    },
    render() {
        let dir = this.props.direction == 'vertical' ? 'column' : 'row';
        return (
            <View style={{flex: 1, flexDirection: dir, justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch'}}>
                {this.renderLabel()}
                {this.props.buttons.map((b,i) => {
                    return (
                        <RadioButton key={i} label={b.label} labelpos={b.labelpos} selected={b.value==this.props.state} onSelected={this.onSelected(b)} />
                    );
                })}
            </View>
        );
    },
    renderLabel() {
        if (this.props.title) {
            return (
                <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>{title}</Text>
            );
        }
        return null;
    }
});

module.exports = RadioButtonGroup;
