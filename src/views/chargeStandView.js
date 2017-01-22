import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric,MultiSelectList} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import QuickValuesView from './quickValuesView';
import DiceModifiersView from './diceModifiersView';
import Icons from '../res';
import Morale from '../services/morale';
import Base6 from '../services/base6';
import getRules from '../selectors/rules';

var ChargeStandView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
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
                <View style={{flex: 1, marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: .75, flexDirection: 'row'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end'}}>
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
                <View style={{flex:3, flexDirection:'row'}}>
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
            </View>
        );
    },
    modifiers() {        
        return this.props.rules.charge.stand.modifiers;
    }
});

const mapStateToProps = (state) => ({
    rules: getRules(state)
});

module.exports = connect(
  mapStateToProps
)(ChargeStandView);