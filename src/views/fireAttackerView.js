import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric} from 'react-native-nub';
import FireAttackerAdvancedAddView from './fireAttackerAdvancedAddView';
import FireAttackerBasicAddView from './fireAttackerBasicAddView';

var FireAttackerView = React.createClass({
    render() {
        return (
            <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 3}}>
                {this.props.hasRules
                    ? <FireAttackerAdvancedAddView onSet={this.props.onChanged} onAdd={this.props.onAdd} />
                    : <FireAttackerBasicAddView value={this.props.value} onSet={this.props.onChanged} />
                }
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerView;
