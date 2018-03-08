import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric,Style} from 'react-native-nub';

var FireAttackerView = React.createClass({
    render() {
        let DetailView = this.props.detailView || View;
        return (
            <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:6}}>
                    <SpinNumeric fontSize={Style.Font.xlarge()} value={this.props.value} min={0} onChanged={this.props.onChanged} />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                <View style={{flex: 3}}>
                    <DetailView value={this.props.value} onSet={this.props.onChanged} onAdd={this.props.onAdd} />
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerView;
