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
        let justify = dir == 'column' ? 'flex-start' : 'center';
        let align = dir == 'column' ? 'flex-start' : 'center';
        let margin = dir == 'column' ? 10 : 0;
        return (
            <View style={{flex: 1, alignSelf: 'stretch'}}>
                {this.renderLabel()}
                <View style={{flex: 1, flexDirection: dir, margin: margin, justifyContent: justify, alignItems: align, alignSelf: 'stretch'}}>
                    {this.props.buttons.map((b,i) => {
                        return (
                            <RadioButton key={i} label={b.label} labelpos={b.labelpos} selected={b.value==this.props.state} onSelected={this.onSelected(b)} />
                        );
                    })}
                </View>
            </View>
        );
    },
    renderLabel() {
        if (this.props.title) {
            return (
                <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>{this.props.title}</Text>
            );
        }
        return null;
    }
});

module.exports = RadioButtonGroup;
