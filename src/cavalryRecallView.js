'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var MultiSelectList = require('./widgets/multiSelectList');
var SelectList = require('./widgets/selectList');
var DiceRoll = require('./widgets/diceRoll');
var Icons = require('./res/icons');
var Base6 = require('./services/base6');
var Current = require('./services/current');

var CavalryRecallView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'blue'}
    ],
    getInitialState() {
        let types = this.types();
        return {
            type: types[0],
            mods: {},
            die1: 1,
            results: ''
        };
    },
    onTypeChanged(v) {
        this.state.type = v;
        this.onResolve();
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
       this.onResolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.onResolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.onResolve();
    },
    onResolve() {
        let battle = Current.battle();
        let table = battle.charge.recall.table[this.state.type] || {};
        let mod = this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        this.state.results = ((this.state.die1 + mod) >= table.low) ? 'Recall' : 'Continue';
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Cavalry Recall</Text>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <SelectList title={'Type'} titleonly={true}
                            items={this.types().map((t) => {return {label: t, value: t};})}
                            selected={this.state.type}
                            onChanged={this.onTypeChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <MultiSelectList title={'Modifiers'}
                            items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                    <View style={{flex:2, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontWeight: 'bold'}}>{this.state.results}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1]} onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    },
    types() {
        let battle = Current.battle();
        return Object.keys(battle.charge.recall.table);
    },
    modifiers() {
        let battle = Current.battle();
        return battle.charge.recall.modifiers;
    }
});

module.exports = CavalryRecallView;
