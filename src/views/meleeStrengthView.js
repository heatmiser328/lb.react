import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric, Font} from 'react-native-nub';

var MeleeStrengthView = React.createClass({
    render() {
        return (
              <View style={{flex:1}}>
                  <Text style={{fontSize: Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{this.props.label}</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />                    
                  </View>
              </View>
        );
    }
});

module.exports = MeleeStrengthView;
