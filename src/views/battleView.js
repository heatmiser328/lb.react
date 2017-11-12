import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from './turnView';
import FireView from './fireView';
import MeleeView from './meleeView';
import MoraleView from './moraleView';
import GeneralView from './generalView';
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
                    tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}                    
                >
                    <FireView tabLabel="Fire" />
                    <MeleeView tabLabel="Melee" />
                    <MoraleView tabLabel="Morale" />                    
                    <GeneralView tabLabel="General" />
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
