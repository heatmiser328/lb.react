'use strict'
var React = require('react');
import { View, Text } from 'react-native';
import {SpinNumeric} from 'app-nub.react';

var MeleeStrengthView = React.createClass({
    render() {
        return (
              <View style={{flex:1}}>
                  <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{this.props.label}</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 6}}>
                            <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                        </View>
                  </View>
              </View>
        );
    }
});

module.exports = MeleeStrengthView;
