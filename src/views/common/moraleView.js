import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import {SpinNumeric,MultiSelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import DiceModifiersView from './diceModifiersView';
import QuickValuesView from './quickValuesView';
import MoraleTableView from './moraleTableView';
import MoraleLevelsView from './moraleLevelsView';
import Base6 from '../../services/base6';
import Morale from '../../services/morale';
import Icons from '../../res';

var MoraleView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        return {
            morale: '11',
            mods: {},
            die1: 1,
            die2: 1,
            result: 'Fail',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100            
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },        
    onMoraleChanged(v) {
        this.state.morale = v;
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
    onResolve(e) {
        let mod = this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        let b = Morale.check(+this.state.morale,mod,this.state.die1,this.state.die2);
        this.state.result = b ? 'Pass' : 'Fail';
        this.setState(this.state);
    },
    render() {        
        let icon = this.state.result == 'Fail' ? Icons['fail'] : Icons['pass'];
        let iconsize = (Math.min(this.state.height, this.state.width) * 0.9) || 16;
        let levels = this.levels();
        return (
            <View style={{flex: 1}}>
                <View style={{flex:.75, marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex:.35}} />
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onLayout={this.onLayout}>
                            <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={icon} />
                        </View>
                        <View style={{flex:.35}} />
                        <View style={{flex: 1}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                    onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                </View>
                <View style={{flex: 3, flexDirection: 'row'}}>
                    <View style={{flex: 2, justifyContent: 'flex-start'}}>
                        <View style={{flex:1}}>
                            <SpinNumeric value={this.state.morale} values={Base6.values} integer={true} onChanged={this.onMoraleChanged} />
                        </View>
                        <View style={{flex:1}}>
                            <QuickValuesView values={[16,26,36,46,56]} height={48} onChanged={this.onMoraleChanged}/>
                        </View>
                        <View style={{flex:4}}>
                            <MultiSelectList title={'Modifiers'}
                                items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                                onChanged={this.onModChanged}/>                        
                        </View>
                    </View>
                    <MoraleTableView range={Morale.range((this.state.die1*10) + this.state.die2)} marginTop={10} />
                </View>
                {levels != null 
                    ? <View style={{flex:1}}>
                        <MoraleLevelsView levels={levels} />
                    </View>
                    : null
                }
            </View>
        );
    },
    rules() {
        if (this.props.battle.rules && this.props.battle.rules.hasOwnProperty('morale')) {
            return this.props.battle.rules.morale;
        }
    },
    modifiers() {        
        let rules = this.rules();
        if (!rules) {
            // defaults
            return [
                {"name": "Disorder", "mod": -3},
                {"name": "Rout", "mod": -6},
                {"name": "50% Losses", "mod": -6},
                {"name": "Road Col", "mod": -6},
                {"name": "Force March", "mod": -3}
            ];
        }
        return rules.modifiers;
    },
    levels() {
        let rules = this.rules();
        if (rules) {
            return rules.levels;
        }
        return null;
    }
});

module.exports = MoraleView;

