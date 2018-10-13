import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric} from 'react-native-nub';
import Style from '../../services/style';

var MeleeStrengthView = React.createClass({
    render() {
        return (
              <View style={{flex:1}}>
                  <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{this.props.label}</Text>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <SpinNumeric fontSize={Style.Font.large()}  imagedown={'button-minus'} imageup={'button-plus'} value={this.props.value} min={0} onChanged={this.props.onChanged} />
                  </View>
              </View>
        );
    }
});

module.exports = MeleeStrengthView;
