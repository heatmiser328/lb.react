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
import GeneralView from './generalView';
import VictoryView from './victoryView';
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
        console.log('BattleView', this.props.battle.name, this.props.battle.rules);
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}                    
                >
                    {this.props.battle.rules.hasOwnProperty('charge') ? <ChargeView tabLabel="Charge" /> : null}
                    <FireView tabLabel="Fire" />
                    {this.props.battle.rules.hasOwnProperty('melee') ? <AssaultView tabLabel="Assault" /> : null}
                    <MeleeView tabLabel="Melee" />
                    <MoraleView tabLabel="Morale" />                    
                    <GeneralView tabLabel="General" />
                    {this.props.battle.hasOwnProperty('victory') && this.props.battle.victory ? <VictoryView tabLabel="Victory" /> : null}
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
