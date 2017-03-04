import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric,Style} from 'react-native-nub';

var MeleeStrengthView = React.createClass({
    render() {
        return (
              <View style={{flex:1}}>
                  <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{this.props.label}</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                      <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                  </View>
              </View>
        );
    }
});

module.exports = MeleeStrengthView;
