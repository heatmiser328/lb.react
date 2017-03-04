import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import ChargeView from './chargeView';
import FireView from '../common/fireView';
import FireAttackerDetailView from './fireAttackerDetailView';
import FireDefenderDetailView from './fireDefenderDetailView';
import AssaultView from './assaultView';
import MeleeView from '../common/meleeView';
import MoraleView from '../common/moraleView';
import GeneralView from '../common/generalView';
import ArtilleryView from '../common/artilleryView';
import VictoryView from '../common/victoryView';

var BattleView = React.createClass({
    render() {        
        return (
            <ScrollableTabView
                style={{backgroundColor: '#fff'}}
                tabBarTextStyle={{fontSize: Style.Font.medium()}}                
                initialPage={this.props.initialPage}                    
            >
                <ChargeView tabLabel="Charge" battle={this.props.battle} />
                <FireView tabLabel="Fire" battle={this.props.battle} attsize={3}
                    attackerDetail={FireAttackerDetailView} 
                    defenderDetail={FireDefenderDetailView} />
                <AssaultView tabLabel="Assault" battle={this.props.battle} />
                <MeleeView tabLabel="Melee" battle={this.props.battle} />
                <MoraleView tabLabel="Morale" battle={this.props.battle} />
                <GeneralView tabLabel="General" battle={this.props.battle}>
                    <View style={{flex:8}}>
                        <ArtilleryView />
                    </View>
                </GeneralView>
                {this.props.battle.victory ? <VictoryView tabLabel="Victory" battle={this.props.battle} /> : null}
            </ScrollableTabView>
        );
    }
});

module.exports = BattleView;
