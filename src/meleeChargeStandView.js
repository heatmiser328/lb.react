'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var MultiSelectList = require('./widgets/multiSelectList');
var QuickValuesView = require('./quickValuesView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Icons = require('./res/icons');
var Morale = require('./services/morale');
var Base6 = require('./services/base6');
var Current = require('./services/current');

var MeleeChargeStandView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        return {
            morale: '11',
            leader: '0',
            mods: {},
            die1: 1,
            die2: 1,
            results: ''
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
        // resolve morale check: pass = stand, fail = disorder
        let mod = +this.state.leader + this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        let b = Morale.check(+this.state.morale,mod,this.state.die1,this.state.die2);
        this.state.results = //b ? 'Stand' : 'Disorder';
            b ? 'pass' : 'fail';
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:4, flexDirection:'row'}}>
                    <View style={{flex:3, justifyContent: 'flex-start'}}>
                        <View style={{flex:1, marginLeft: 5}}>
                            <SpinNumeric label={'Morale'} value={this.state.morale} values={Base6.values} integer={true} onChanged={this.onMoraleChanged} />
                        </View>
                        <View style={{flex: 1}}>
                            <QuickValuesView values={[16,26,36,46,56]} onChanged={this.onMoraleChanged}/>
                        </View>
                        <View style={{flex:1, marginLeft: 5}}>
                            <SpinNumeric label={'Leader'} value={this.state.leader} integer={true} onChanged={this.onLeaderChanged} />
                        </View>
                        <View style={{flex: 1}}>
                            <QuickValuesView values={[-3,0,3,6,12]} onChanged={this.onLeaderChanged}/>
                        </View>
                        <View style={{flex:3}} />
                    </View>
                    <View style={{flex:2}}>
                        <MultiSelectList title={'Modifiers'}
                            items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
                <View style={{flex: .75, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
                    <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end'}}>
                        {/* images for stand,disorder*/}
                        {/*<Text>{this.state.results}</Text>*/}
                        <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={Icons[this.state.results]} />
                    </View>
                    <View style={{flex:2}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    },
    modifiers() {
        let battle = Current.battle();
        return battle.charge.stand.modifiers;
    }
});

module.exports = MeleeChargeStandView;
