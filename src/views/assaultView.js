import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric,RadioButtonGroup,MultiSelectList,SelectList,Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import QuickValuesView from './quickValuesView';
import DiceModifiersView from './diceModifiersView';
import Icons from '../res';
import Base6 from '../services/base6';
import Morale from '../services/morale';
import getRules from '../selectors/rules';

var AssaultView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        let odds = this.odds();
        let defodds = odds.find((o) => o.name == '1/1') || odds[1];
        return {
            morale: '11',
            leader: '0',
            mode: 1,
            mods: {},
            odds: defodds.name,
            die1: 1,
            die2: 1,
            result: null,
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
        let iconSize = (Math.min(this.state.height, this.state.width) * 0.9) || 16;
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, marginTop: 5, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: .75, flexDirection: 'row'}}>
                        <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
                            <RadioButtonGroup buttons={[{label: 'Defender', value: 1},{label: 'Attacker', value: 0}]} state={this.state.mode} onSelected={this.onModeChanged} />
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onLayout={this.onLayout}>
                            <Image style={{height: iconSize, width: iconSize, resizeMode: 'stretch'}} source={icon} />
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                    <View style={{flex: .75}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1, borderRightWidth:1,borderRightColor:'gray'}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor:'silver', alignSelf:'stretch', textAlign:'center'}}>Morale</Text>
                        <SpinNumeric value={this.state.morale} values={Base6.values} integer={true} onChanged={this.onMoraleChanged} />
                        <QuickValuesView values={[16,26,36,46,56]} onChanged={this.onMoraleChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor:'silver', alignSelf:'stretch', textAlign:'center'}}>Leader</Text>
                        <SpinNumeric value={this.state.leader} integer={true} onChanged={this.onLeaderChanged} />
                        <QuickValuesView values={[-3,0,3,6,12]} onChanged={this.onLeaderChanged}/>
                    </View>                    
                </View>
                <View style={{flex:2.5, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <RadioButtonGroup title={'Odds'} direction={'vertical'} buttons={this.odds().map((o) => {return {label:o.name,value:o.name};})} state={this.state.odds} onSelected={this.onOddsChanged} />
                    </View>
                    <View style={{flex: 3}}>
                        <MultiSelectList title={'Modifiers'}
                            items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged} />
                    </View>
                </View>
            </View>
        );
    },
    odds() {        
        return this.props.rules.assault.odds;
    },
    modifiers() {        
        return this.props.rules.assault.modifiers;
    }
});

const mapStateToProps = (state) => ({
    rules: getRules(state)
});

module.exports = connect(
  mapStateToProps
)(AssaultView);
