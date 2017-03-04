import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric,Style} from 'react-native-nub';

var FireDefenderView = React.createClass({
    render() {
        let DetailView = this.props.detailView || View;
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 3}}>
                    <DetailView battle={this.props.battle} onSet={this.props.onChanged} onChanged={this.props.onChanged}/>                
                </View>
            </View>
        );
    }
});

module.exports = FireDefenderView;
