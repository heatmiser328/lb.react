import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import VictoryPointsView from './victoryPointsView';
import VictoryConditionsView from './victoryConditionsView';
import getGame from '../selectors/game';

var VictoryView = React.createClass({
    render() {        
        return (
            <View style={{flex:1}}>
                {this.hasVPs() 
                    ? <VictoryPointsView />
                    : <VictoryConditionsView />
                }
            </View>
        );
    },
    hasVPs() {
        return !!this.props.battle.victory.find((v) => v.hasOwnProperty('low'));
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(VictoryView);

