'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var MeleeAssaultUnitList = require('./meleeAssaultUnitList');
var RadioButtonGroup = require('./widgets/radioButtonGroup');
var MultiSelectList = require('./widgets/multiSelectList');
var SelectList = require('./widgets/selectList');
var OddsView = require('./oddsView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Base6 = require('./services/base6');
var Morale = require('./services/morale');
var Current = require('./services/current');

var MeleeAssaultView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        let odds = this.odds();
        return {
            units: [
                {value: '11', result: null},
                {value: '11', result: null},
                {value: '11', result: null},
                {value: '11', result: null},
                {value: '11', result: null}
            ],
            mode: 0,
            mods: {},
            odds: odds[1].name,
            die1: 1,
            die2: 1
        };
    },
    onUnitChanged(i,v) {
        this.state.units[i].value = v;
        this.onResolve();
    },
    onModeChanged(v) {
        this.setState({mode:v, mods: {}, units: [
                {value: '11', result: null},
                {value: '11', result: null},
                {value: '11', result: null},
                {value: '11', result: null},
                {value: '11', result: null}
            ]});
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
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
        this.onResolve();
    },
    onResolve() {
        // perform morale checks for both attacker and defender
        let oddsmod = this.odds().find((o) => o.name == this.state.odds) || {};
        let attmod = oddsmod.attmod + this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.attmod, 0);
        let defmod = oddsmod.defmod + this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.defmod, 0);
        let mod = this.state.mode == 0 ? attmod : defmod;
        this.state.units.filter((u) => u.value != '11').forEach((u) => {
            u.result = Morale.check(+u.value,mod,this.state.die1,this.state.die2);
        });        
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 3.5, flexDirection: 'row'}}>
                    {/* units */}
                    <View style={{flex:3}}>
                        <MeleeAssaultUnitList title={'Units'} items={this.state.units} onChanged={this.onUnitChanged}/>
                    </View>
                    {/* modifiers */}
                    <View style={{flex:2}}>
                        <View style={{flex: 3}}>
                            <MultiSelectList title={'Modifiers'}
                                items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                                onChanged={this.onModChanged} />
                        </View>
                        <View style={{flex:2}}>
                            {/*<OddsView odds={this.odds().map((o) => o.name)} value={this.state.odds} onChanged={this.onOddsChanged} />*/}
                            <SelectList title={'Odds'} titleonly={true} items={this.odds().map((o) => o.name)} selected={this.state.odds} onChanged={this.onOddsChanged} />
                        </View>
                        <View style={{flex:.5}}>
                            <RadioButtonGroup buttons={[{label: 'Attacker', value: 0}, {label: 'Defender', value: 1}]} state={this.state.mode} onSelected={this.onModeChanged} />
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: .75, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
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
