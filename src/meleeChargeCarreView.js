'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
import {SpinNumeric,MultiSelectList,RadioButtonGroup} from 'react-native-app-nub';
import {DiceRoll} from 'react-native-dice';
var QuickValuesView = require('./quickValuesView');
var DiceModifiersView = require('./diceModifiersView');
var Icons = require('./res/icons');
var Base6 = require('./services/base6');
var Current = require('./services/current');

var MeleeChargeCarreView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        let nationalities = this.nationalities();
        let formations = this.formations(nationalities[0]);
        return {
            nationality: nationalities[0],
            formation: formations[0],
            distance: '4',
            mods: {},
            die1: 1,
            die2: 1,
            results: ''
        };
    },
    onNationalityChanged(v) {
        this.state.nationality = v;
        this.updateFormations();
        this.onResolve();
    },
    onFormationChanged(v) {
        this.state.formation = v;
        this.onResolve();
    },
    onDistanceChanged(v) {
        this.state.distance = v;
        this.onResolve();
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
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
        let battle = Current.battle();
        let table = battle.charge.carre.table[this.state.nationality][this.state.formation][this.state.distance] || [];
        let mod = this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        let dice = Base6.add((this.state.die1 * 10) + this.state.die2, mod);
        let result = table.find((t) => dice >= t.low && dice <= t.high) || {};
        this.state.results = result.result;
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: .75, flexDirection: 'row'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end'}}>
                            {/* images for square,disorder,rout*/}
                            {/*<Text>{this.state.results}</Text>*/}
                            <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[this.state.results]} />
                        </View>
                        <View style={{flex:3}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    {/*morale*/}
                    <View style={{flex:4, justifyContent: 'flex-start', borderRightWidth: 1, borderRightColor: 'gray'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Nationality'} direction={'vertical'}
                                    buttons={this.nationalities().map((n) => {return {label:n,value:n};})}
                                    state={this.state.nationality}
                                    onSelected={this.onNationalityChanged}/>
                            </View>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Formation'} direction={'vertical'}
                                    buttons={this.formations(this.state.nationality).map((f) => {return {label:f,value:f};})}
                                    state={this.state.formation}
                                    onSelected={this.onFormationChanged}/>
                            </View>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Distance'} direction={'vertical'}
                                    buttons={['4','3','2','1'].map((d) => {return {label:d,value:d};})}
                                    state={this.state.distance}
                                    onSelected={this.onDistanceChanged}/>
                            </View>
                        </View>
                    </View>
                    {/*modifiers*/}
                    <View style={{flex:2}}>
                        <MultiSelectList title={'Modifiers'}
                            items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
            </View>
        );
    },
    nationalities() {
        let battle = Current.battle();
        return Object.keys(battle.charge.carre.table);
    },
    formations(nationality) {
        let battle = Current.battle();
        return Object.keys(battle.charge.carre.table[nationality]);
    },
    modifiers() {
        let battle = Current.battle();
        return battle.charge.carre.modifiers;
    },
    updateFormations() {
        let formations = this.formations(this.state.nationality);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
    }
});

module.exports = MeleeChargeCarreView;
