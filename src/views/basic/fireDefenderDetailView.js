import React from 'react';
import { View } from 'react-native';
import QuickValuesView from '../common/quickValuesView';

var FireDefenderDetailView = React.createClass({
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1}} />
                <View style={{flex:1}}>
                    <QuickValuesView values={[4,6,9,12,14,16]} onChanged={this.props.onChanged}/>
                </View>                
            </View>            
        );
    }
});

module.exports = FireDefenderDetailView;
