import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import ManeuverView from './maneuverView';
//import ChargeView from './chargeView';
//import FireView from '../common/fireView';
//import MoraleView from '../common/moraleView';
//import AssaultView from './assaultView';
//import MeleeView from '../common/meleeView';
//import GeneralView from '../common/generalView';
//import VictoryView from '../common/victoryView';

var BattleView = React.createClass({
    render() {        
        return (
            <ScrollableTabView
                style={{backgroundColor: '#fff'}}
                tabBarTextStyle={{fontSize: Style.Font.medium()}}                
                initialPage={this.props.initialPage}                    
            >
                <ManeuverView tabLabel="Maneuver" battle={this.props.battle} />
            </ScrollableTabView>
        );
        /*
                <ChargeView tabLabel="Charge" battle={this.props.battle} />
                <FireView tabLabel="Fire" battle={this.props.battle} />
                <AssaultView tabLabel="Assault" battle={this.props.battle} />
                <MeleeView tabLabel="Melee" battle={this.props.battle} />
                <MoraleView tabLabel="Morale" battle={this.props.battle} />
                <GeneralView tabLabel="General" battle={this.props.battle} />
                {this.props.battle.victory ? <VictoryView tabLabel="Victory" battle={this.props.battle} /> : null}        
        */
    }
});

module.exports = BattleView;
