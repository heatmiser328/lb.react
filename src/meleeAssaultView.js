'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var MeleeAssaultUnitList = require('./meleeAssaultUnitList');
var MultiSelectList = require('./widgets/multiSelectList');
var SelectList = require('./widgets/selectList');
var OddsView = require('./oddsView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Morale = require('./services/morale');

// might come from selected battle?
let odds = [
    {name: '1/2', attmod: -6, defmod: 6},
    {name: '1/1', attmod: -3, defmod: 3},
    {name: '2/1', attmod: 0, defmod: 0},
    {name: '3/1', attmod: 3, defmod: -3},
    {name: '4/1', attmod: 6, defmod: -6},
    {name: '5/1+', attmod: 9, defmod: -9}
];

let modifiers = [
    {name: 'Assaulted in flank', type: 'defend', attmod: 12, defmod: -12},
    {name: 'Assaulted in rear', type: 'defend', attmod: 6, defmod: -6},
    {name: 'In skirmish order', type: 'defend', attmod: 99, defmod: -6},
    {name: 'In Line', type: 'defend', attmod: 0, defmod: -3},
    {name: 'In Carre', type: 'defend', attmod: 0, defmod: 6},
    {name: 'Disordered', type: 'defend', attmod: 3, defmod: -3},
    {name: 'Routed', type: 'defend', attmod: 6, defmod: -6},
    {name: 'Assaulting up a slope', type: 'attack', attmod: -3, defmod: 3},
    {name: 'Assaulting across a stream', type: 'attack', attmod: -3, defmod: 3},
    {name: 'Casualty due to defensive fire', type: 'attack', attmod: -3, defmod: 0}
];


var MeleeAssaultView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'},
        {num: 1, low: 1, high: 6, color: 'blackw'},
        {num: 1, low: 1, high: 6, color: 'blackr'}
    ],
    getInitialState() {
        return {
            attack: [
                {value: '11', result: ''},
                {value: '11', result: ''},
                {value: '11', result: ''},
                {value: '11', result: ''},
                {value: '11', result: ''}
            ],
            attmods: {},
            defend: [
                {value: '11', result: ''},
                {value: '11', result: ''},
                {value: '11', result: ''},
                {value: '11', result: ''},
                {value: '11', result: ''}
            ],
            defmods: {},
            odds: odds[1].name,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1
        };
    },
    onAttackerChanged(i,v) {
        this.state.attack[i].value = v;
        this.onResolve();
    },
    onAttackerModChanged(m) {
       this.state.attmods[m.name] = m.selected;
       this.onResolve();
    },
    onDefenderChanged(i,v) {
        this.state.defend[i].value = v;
        this.onResolve();
    },
    onDefenderModChanged(m) {
       this.state.defmods[m.name] = m.selected;
       this.onResolve();
    },
    onOddsChanged(v) {
        this.state.odds = v;
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
        this.state.die3 = d[2].value;
        this.state.die4 = d[3].value;
        this.onResolve();
    },
    onResolve(e) {
        // perform morale checks for both attacker and defender
        let oddsmod = odds.find((o) => o.name == this.state.odds) || {};
        let attmod = oddsmod.attmod + modifiers.filter((m) => m.type == 'attack' && this.state.attmods[m.name]).reduce((p,c) => p + c.attmod, 0);
        let defmod = oddsmod.defmod + modifiers.filter((m) => m.type == 'defend' && this.state.defmods[m.name]).reduce((p,c) => p + c.defmod, 0);
        this.state.attack.filter((a) => a.value != '11').forEach((a) => {
            // adjust by selected modifiers
            a.result = Morale.check(+a.value,attmod,this.state.die1,this.state.die2);
        });
        this.state.defend.filter((d) => d.value != '11').forEach((d) => {
            // adjust by selected modifiers
            d.result = Morale.check(+d.value,defmod,this.state.die3,this.state.die4);
        });
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4, flexDirection: 'row'}}>
                    <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                        <View style={{flex:3}}>
                            <MeleeAssaultUnitList title={'Attack'} items={this.state.attack} onChanged={this.onAttackerChanged}/>
                        </View>
                        <View style={{flex:2}}>
                            <MultiSelectList title={'Modifiers'}
                                items={modifiers.filter((m) => m.type == 'attack').map((m) => {return {name: m.name, selected: this.state.attmods[m.name]};})}
                                onChanged={this.onAttackerModChanged}/>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flex:3}}>
                            <MeleeAssaultUnitList title={'Defend'} items={this.state.defend} onChanged={this.onDefenderChanged}/>
                        </View>
                        <View style={{flex:2}}>
                            <MultiSelectList title={'Modifiers'}
                                items={modifiers.filter((m) => m.type == 'defend').map((m) => {return {name: m.name, selected: this.state.defmods[m.name]};})}
                                onChanged={this.onDefenderModChanged}/>
                        </View>
                    </View>
                </View>
                <View style={{flex: .75, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
                    <View style={{flex:1}}>
                        <OddsView odds={odds.map((o) => o.name)} value={this.state.odds} onChanged={this.onOddsChanged} />
                        {/*<SelectList title={'Odds'} titleonly={true} items={odds.map((o) => o.name)} selected={this.state.odds} onChanged={this.onOddsChanged} />*/}
                    </View>
                    <View style={{flex:3}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    }
});

module.exports = MeleeAssaultView;
