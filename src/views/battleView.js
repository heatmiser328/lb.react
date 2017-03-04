import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
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
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44),backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={Icons[this.props.battle.image]} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}                    
                >
                    {this.hasRules('charge') ? <ChargeView tabLabel="Charge" /> : null}
                    <FireView tabLabel="Fire" />
                    {this.hasRules('melee') ? <AssaultView tabLabel="Assault" /> : null}
                    <MeleeView tabLabel="Melee" />
                    <MoraleView tabLabel="Morale" />                    
                    <GeneralView tabLabel="General" />
                    {this.props.battle.victory ? <VictoryView tabLabel="Victory" /> : null}
                </ScrollableTabView>
            </View>
        );
    },
    hasRules(type) {
        return this.props.battle.rules.hasOwnProperty(type);
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(BattleView);
