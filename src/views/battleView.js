import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TurnView from './turnView';
import ChargeView from './chargeView';
/*
var FireView = require('./fireView');
var MeleeAssaultView = require('./meleeAssaultView');

var MeleeResolutionView = require('./meleeResolutionView');
var MoraleView = require('./moraleView');
var GeneralView = require('./generalView');
*/
import Icons from '../res';
import getGame from '../selectors/game';

var BattleView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    onChangeTab() {
    },
    render() {        
        /*        
        <FireView tabLabel="Fire" />
        <MoraleView tabLabel="Morale" />
        {this.props.battle.rules.melee ? <MeleeAssaultView tabLabel="Assault" /> : null}
        <MeleeResolutionView tabLabel="Melee" />
        <GeneralView tabLabel="General" />
        */
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}                    
                >
                    {this.props.battle.rules.melee ? <ChargeView tabLabel="Charge" /> : null}
                    <View tabLabel="Fire" />
                    <View tabLabel="Morale" />
                    <View tabLabel="Assault" />
                    <View tabLabel="Melee" />
                    <View tabLabel="General" />                
                </ScrollableTabView>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(BattleView);
