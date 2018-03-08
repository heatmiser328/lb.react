import React from 'react';
import { View, Text, Image } from 'react-native';
import {RadioButtonGroup,MultiSelectList,Style} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import DiceModifiersView from '../common/diceModifiersView';
import Icons from '../../res';
import Base6 from '../../services/base6';

var ChargeRecallView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'yellow', dotcolor:'black'}
    ],
    getInitialState() {
        let types = this.types();
        return {
            type: types[0],
            mods: {},
            die1: 1,
            results: '',
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
        let table = this.rules().table[this.state.type] || {};
        let mod = this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        this.state.results = ((this.state.die1 + mod) >= table.low) ? 'Recall' : 'Ride';
        this.setState(this.state);
    },
    render() {
        let iconsize = (Math.min(this.state.height, this.state.width)) || 16;
        return (
            <View style={{flex:1}}>
                <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:3, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[(this.state.results||'').toLowerCase()]} />
                            {/*<Text style={{fontSize: Style.Font.mediumlarge(), fontWeight: 'bold'}}>{this.state.results}</Text>*/}
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                    <View style={{flex: 4, backgroundColor: 'whitesmoke'}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <RadioButtonGroup title={'Type'} labelFontSize={Style.Font.mediumlarge()} direction={'vertical'}
                            buttons={this.types().map((t) => ({label:t,value:t, fontSize: Style.Font.mediumlarge()}))}
                            state={this.state.type}
                            onSelected={this.onTypeChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <MultiSelectList title={'Modifiers'}
                            labelFontSize={Style.Font.mediumlarge()} 
                            itemFontSize={Style.Font.mediumlarge()}                        
                            items={this.modifiers().map((m) =>  ({name: m.name, selected: this.state.mods[m.name]}))}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
            </View>
        );
    },
    rules() {
        return this.props.battle.rules.charge.recall;
    },    
    types() {        
        return Object.keys(this.rules().table);
    },
    modifiers() {        
        return this.rules().modifiers;
    }
});

module.exports = ChargeRecallView;
