import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import {SpinNumeric,MultiSelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import DiceModifiersView from './diceModifiersView';
import QuickValuesView from './quickValuesView';
import Base6 from '../services/base6';
import Morale from '../services/morale';
import Icons from '../res';

var modifiers = [
    {"name": "Disorder", "mod": -3},
    {"name": "Rout", "mod": -6},
    {"name": "50% Losses", "mod": -6},
    {"name": "Road Col", "mod": -6},
    {"name": "Force March", "mod": -3}
];

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
            result: 'Fail'
        };
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
        let mod = modifiers.filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        let b = Morale.check(+this.state.morale,mod,this.state.die1,this.state.die2);
        this.state.result = b ? 'Pass' : 'Fail';
        this.setState(this.state);
    },
    render() {
        //console.log(this.props);
        let icon = this.state.result == 'Fail' ? Icons['fail'] : Icons['pass'];
        return (
            <View style={{flex: 1}}>
                <View style={{flex:.75, marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{height: 64, width: 64, resizeMode: 'stretch'}} source={icon} />
                        </View>
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
                                items={modifiers.map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                                onChanged={this.onModChanged}/>                        
                        </View>
                    </View>
                    <View style={{flex:1, marginTop: 10}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Morale</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Mod</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
                            </View>
                        </View>
                        <View style={{flex:2}}>
                            <ScrollView
                                ref={view => this._scrollView = view}
                                automaticallyAdjustContentInsets={false}
                                scrollEventThrottle={200}>
                                {Morale.range((this.state.die1*10) + this.state.die2).map((res,i) => {
                                    let icon = res.morale ? (!res.result ? Icons['fail'] : Icons['pass']) : null;
                                    return (
                                        <View key={i} style={{flex:1, flexDirection: 'row'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize: 16,textAlign: 'center'}}>{res.morale}</Text>
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize: 16,textAlign: 'center'}}>{res.modifier}</Text>
                                            </View>
                                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                                <Image style={{height: 28, width: 28, resizeMode: 'stretch'}} source={icon} />
                                            </View>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = MoraleView;
