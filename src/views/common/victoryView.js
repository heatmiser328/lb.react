import React from 'react';
import { View } from 'react-native';
import VictoryPointsView from './victoryPointsView';
import VictoryConditionsView from './victoryConditionsView';

var VictoryView = React.createClass({
    render() {        
        return (
            <View style={{flex:1}}>
                {this.hasVPs() 
                    ? <VictoryPointsView battle={this.props.battle} />
                    : <VictoryConditionsView battle={this.props.battle} />
                }
            </View>
        );
    },
    hasVPs() {
        return !!this.props.battle.victory.find((v) => v.hasOwnProperty('low'));
    }
});

module.exports = VictoryView;

