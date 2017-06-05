import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import TurnView from '../common/turnView';
import FireView from '../common/fireView';
import FireAttackerDetailView from './fireAttackerDetailView';
import FireDefenderDetailView from './fireDefenderDetailView';
import MeleeView from '../common/meleeView';
import MoraleView from '../common/moraleView';
import GeneralView from '../common/generalView';

var BattleView = React.createClass({
    render() {        
        return (
            <View style={{flex:1}}>
                <TurnView logo={this.props.battle.image} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.medium()}}                
                    initialPage={this.props.initialPage}                    
                >
                    <FireView tabLabel="Fire" battle={this.props.battle} 
                        attackerDetail={FireAttackerDetailView} 
                        defenderDetail={FireDefenderDetailView} />
                    <MeleeView tabLabel="Melee" battle={this.props.battle} />
                    <MoraleView tabLabel="Morale" battle={this.props.battle} />
                    <GeneralView tabLabel="General" battle={this.props.battle} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BattleView;