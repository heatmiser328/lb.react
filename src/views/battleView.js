import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TurnView from './turnView';
import ChargeView from './chargeView';
import FireView from './fireView';
import MoraleView from './moraleView';
import AssaultView from './assaultView';
import MeleeView from './meleeView';
//var GeneralView = require('./generalView');
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
                    <FireView tabLabel="Fire" />
                    <MoraleView tabLabel="Morale" />
                    {this.props.battle.rules.melee ? <AssaultView tabLabel="Assault" /> : null}
                    <MeleeView tabLabel="Melee" />
                    <View tabLabel="General" />
                    {this.props.battle.victory ? <View tabLabel="Victory" /> : null}
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
