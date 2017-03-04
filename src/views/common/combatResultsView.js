import React from 'react';
import { View } from 'react-native';
import CombatTableView from './combatResultsTableView';
import LeaderLossView from './combatResultsLeaderLossView';
import MoraleTableView from './moraleTableView';
import Morale from '../../services/morale';

var CombatResultsView = React.createClass({
    render() {
        return (
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:2}}>
                    <CombatTableView results={this.props.results} odds={this.props.odds} />
                </View>
                <View style={{flex:3}}>
                    <LeaderLossView combatdice={this.props.combatdice} lossdie={this.props.lossdie} durationdie1={this.props.durationdie1} durationdie2={this.props.durationdie2} melee={this.props.melee} />
                </View>
                <View style={{flex:2}}>
                    <MoraleTableView range={Morale.resolvePossible(this.props.moraledice)} />
                </View>
            </View>
        );
    }    
});

module.exports = CombatResultsView;
