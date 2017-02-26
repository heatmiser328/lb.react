import React from 'react';
import { View, Text, Switch } from 'react-native';
import {Font} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import FireAttackerView from './fireAttackerView';
import FireDefenderView from './fireDefenderView';
import DiceModifiersView from './diceModifiersView';
import CombatResultsView from './combatResultsView';
import Fire from '../services/fire';
import Base6 from '../services/base6';

var FireView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'black', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'black', dotcolor:'red'},
        {num: 1, low: 1, high: 6, diecolor: 'purple', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'yellow', dotcolor:'black'}
    ],
    getInitialState() {
        return {
            attack: '1',
            defend: '1',
            odds: Fire.defaultOdds,
            cannister: false,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            die6: 1,
            die7: 1
        };
    },
    calcOdds(attack, defend, cannister) {
        // calc odds
        var odds = Fire.calculate(+attack, +defend, cannister);
        return odds;
    },
    onAttackerAdd(v) {
        v = +this.state.attack + (+v);
        this.state.odds = this.calcOdds(v, this.state.defend, this.state.cannister);
        this.state.attack = v.toString();
        this.onResolve();
    },
    onAttackerChanged(v) {
        this.state.odds = this.calcOdds(v, this.state.defend, this.state.cannister);
        this.state.attack = v.toString();
        this.onResolve();
    },
    onDefenderAdd(v) {
        v = +this.state.defend + (+v);
        this.state.odds = this.calcOdds(this.state.attack, v, this.state.cannister);
        this.state.defend = v.toString();
        this.onResolve();
    },
    onDefenderChanged(v) {
        this.state.odds = this.calcOdds(this.state.attack, v, this.state.cannister);
        this.state.defend = v.toString();
        this.onResolve();
    },
    onCannisterChanged(v) {
        this.state.cannister = v;
        this.state.odds = this.calcOdds(this.state.attack, this.state.defend, this.state.cannister);
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
        this.state.die5 = d[4].value;
        this.state.die6 = d[5].value;
        this.state.die7 = d[6].value;
        
        this.onResolve();
    },
    onResolve() {
        this.setState(this.state);
    },
    render() {
        //console.log(this.props);        
        return (
            <View style={{flex: 1}}>                
                <View style={{flex: 3, backgroundColor: 'whitesmoke', justifyContent:'flex-start'}}>
                    <View style={{flex: .75, flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5,this.state.die6,this.state.die7]}                            
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                    <View style={{flex: 1}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                    <View style={{flex:2.15}}>                        
                        <CombatResultsView odds={this.state.odds}
                            results={Fire.resolvePossible((this.state.die1*10) + this.state.die2)}
                            combatdice={(this.state.die1*10) + this.state.die2}
                            lossdie={this.state.die3}
                            durationdie1={this.state.die4}
                            durationdie2={this.state.die5}
                            moraledice={(this.state.die6*10) + this.state.die7}                            
                        />                        
                    </View>
                    <View style={{flex: 0.35, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                        <Text style={{fontSize: Font.medium()}}>Cannister</Text>
                        <Switch value={this.state.cannister} onValueChange={this.onCannisterChanged} />
                    </View>                    
                </View>
                <View style={{flex:2, flexDirection:'row'}}>
                    <View style={{flex:1}}>                        
                        <FireAttackerView value={this.state.attack}
                            onAdd={this.onAttackerAdd}
                            onChanged={this.onAttackerChanged}
                            onModifierChanged={this.onAttackerModifierChanged} />                        
                    </View>
                    <View style={{flex:1}}>                        
                        <FireDefenderView value={this.state.defend}
                            onAdd={this.onDefenderAdd}
                            onChanged={this.onDefenderChanged}
                            onIncrementsChanged={this.onDefenderIncrementsChanged} />
                        
                    </View>
                </View>                
            </View>
        );
    }
});

module.exports = FireView;
