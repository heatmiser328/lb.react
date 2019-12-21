import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Style from '../../services/style';
import TurnView from './turnView';
import ChargeView from '../common/chargeView';
import MovementView from '../common/movementView';
import FireView from '../common/fireView';
import FireAttackerDetailView from '../advanced/fireAttackerDetailView2';
import FireDefenderDetailView from '../advanced/fireDefenderDetailView2';
import AssaultView from '../common/assaultView';
import MeleeView from '../common/meleeView';
import MoraleView from '../common/moraleView';
import GeneralView from '../common/generalView';
import ArtilleryView from '../common/artilleryView';
import VictoryView from '../common/victoryView';

var BattleView = React.createClass({
    render() {        
        return (
            <View style={{flex:1}}>
                <TurnView logo={this.props.battle.image} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}                
                    initialPage={this.props.initialPage}                    
                >
                    <ChargeView tabLabel="Charge" battle={this.props.battle} />
                    {this.props.battle.rules && this.props.battle.rules.maneuver && this.props.battle.rules.maneuver.terrain ? <MovementView tabLabel="Move" battle={this.props.battle} /> : null}
                    <FireView tabLabel="Fire" battle={this.props.battle} attsize={3}
                        attackerDetail={FireAttackerDetailView} 
                        defenderDetail={FireDefenderDetailView} />
                    <AssaultView tabLabel="Assault" battle={this.props.battle} />
                    <MeleeView tabLabel="Melee" battle={this.props.battle} />
                    <MoraleView tabLabel="Morale" battle={this.props.battle} />
                    <GeneralView tabLabel="General" battle={this.props.battle}>
                        <View style={{flex:8}}>
                            {!this.props.battle.rules || !this.props.battle.rules.maneuver || !this.props.battle.rules.maneuver.terrain ? <ArtilleryView /> : null}
                        </View>                        
                    </GeneralView>
                    {this.props.battle.victory ? <VictoryView tabLabel="Victory" battle={this.props.battle} /> : null}
                </ScrollableTabView>                
            </View>
        );
    }
});

module.exports = BattleView;
