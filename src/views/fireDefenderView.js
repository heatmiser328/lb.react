import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric,Style} from 'react-native-nub';
import FireDefenderAdvancedAddView from './fireDefenderAdvancedAddView';
import QuickValuesView from './quickValuesView';

var FireDefenderView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                {this.renderValues()}
            </View>
        );
    },
    renderValues() {        
        if (this.props.hasRules) {
            return (
                <View style={{flex: 3}}>
                    <FireDefenderAdvancedAddView rules={this.props.rules.fire} onSet={this.props.onChanged} />
                </View>
            );
        }
        return (
            <View style={{flex: 3}}>
                <View style={{flex:1}} />
                <View style={{flex:1}}>
                    <QuickValuesView values={[4,6,9,12,14,16]} onChanged={this.props.onChanged}/>
                </View>                
            </View>
        );
    }
});

module.exports = FireDefenderView;
