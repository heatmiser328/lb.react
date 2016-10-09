'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
import {SpinNumeric,RadioButtonGroup,MultiSelectList,SelectList} from 'react-native-app-nub';
import {DiceRoll} from 'react-native-dice';
var QuickValuesView = require('./quickValuesView');
var OddsView = require('./oddsView');
var DiceModifiersView = require('./diceModifiersView');
var Icons = require('./res/icons');
var Base6 = require('./services/base6');
var Morale = require('./services/morale');
var Current = require('./services/current');

var MeleeAssaultView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        let odds = this.odds();
        return {
            morale: '11',
            leader: '0',
            mode: 1,
            mods: {},
            odds: odds[1].name,
            die1: 1,
            die2: 1,
            result: null
        };
    },
    onMoraleChanged(v) {
        this.state.morale = v;
        this.onResolve();
    },
    onLeaderChanged(v) {
        this.state.leader = v;
        this.onResolve();
    },
    onModeChanged(v) {
        this.setState({mode:v, leader: '0', mods: {}, result: null});
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
       this.onResolve();
    },
    onOddsChanged(v) {
        this.state.odds = v || this.state.odds;
        this.onResolve();
    },
    onDiceModifierChanged(v) {
        let d = Base6.add((this.state.die1 * 10) + this.state.die2, +v);
        this.state.die1 = Math.floor(d / 10);
        this.state.die2 = d % 10;
        this.onResolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.onResolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.onResolve();
    },
    onResolve() {
        // perform morale checks for both attacker and defender
        let oddsmod = this.odds().find((o) => o.name == this.state.odds) || {};
        let attmod = oddsmod.attmod + this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.attmod, 0);
        let defmod = oddsmod.defmod + this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.defmod, 0);
        let mod = (this.state.mode == 0 ? attmod : defmod) + (+this.state.leader);
        this.state.result = Morale.check(+this.state.morale,mod,this.state.die1,this.state.die2);
        this.setState(this.state);
    },
    render() {
        let icon = this.state.result != null ? (this.state.result ? Icons['pass'] : Icons['fail']) : null;
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1, borderRightWidth:1,borderRightColor:'gray'}}>
                        <Text style={{backgroundColor:'silver', alignSelf:'stretch', textAlign:'center'}}>Morale</Text>
                        <View style={{marginLeft:5}}>
                        {/*label={'Morale'}*/}
                        <SpinNumeric value={this.state.morale} values={Base6.values} integer={true} onChanged={this.onMoraleChanged} />
                        </View>
                        <QuickValuesView values={[16,26,36,46,56]} onChanged={this.onMoraleChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{backgroundColor:'silver', alignSelf:'stretch', textAlign:'center'}}>Leader</Text>
                        <View style={{marginLeft:5}}>
                        {/*label={'Leader'} */}
                        <SpinNumeric value={this.state.leader} integer={true} onChanged={this.onLeaderChanged} />
                        </View>
                        <QuickValuesView values={[-3,0,3,6,12]} onChanged={this.onLeaderChanged}/>
                    </View>
                </View>
                <View style={{flex:2.5, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        {/*<OddsView odds={this.odds().map((o) => o.name)} value={this.state.odds} onChanged={this.onOddsChanged} />*/}
                        {/*<SelectList title={'Odds'} titleonly={true} items={this.odds().map((o) => o.name)} selected={this.state.odds} onChanged={this.onOddsChanged} />*/}
                        <RadioButtonGroup title={'Odds'} direction={'vertical'} buttons={this.odds().map((o) => {return {label:o.name,value:o.name};})} state={this.state.odds} onSelected={this.onOddsChanged} />
                    </View>
                    <View style={{flex: 3}}>
                        <MultiSelectList title={'Modifiers'}
                            items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged} />
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: .75, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
                        <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                            <RadioButtonGroup buttons={[{label: 'Defender', value: 1},{label: 'Attacker', value: 0}]} state={this.state.mode} onSelected={this.onModeChanged} />
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={icon} />
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                    <View style={{flex: .75, backgroundColor: 'whitesmoke'}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                </View>
            </View>
        );
    },
    odds() {
        let battle = Current.battle();
        return battle.assault.odds;
    },
    modifiers() {
        let battle = Current.battle();
        return battle.assault.modifiers;
    }
});

module.exports = MeleeAssaultView;
