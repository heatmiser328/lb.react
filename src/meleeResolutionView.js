'use strict'
var React = require('react');
import { View, Text } from 'react-native';
import {DiceRoll} from 'react-native-dice';
var MeleeStrengthView = require('./meleeStrengthView');
var OddsView = require('./oddsView');
var CombatResultsView = require('./combatResultsView');
var DiceModifiersView = require('./diceModifiersView');
var MeleeCalcView = require('./meleeCalcView');
var Melee = require('./services/melee');
var Base6 = require('./services/base6');

var MeleeResolutionView = React.createClass({
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
            attack: '0',
            defend: '0',
            odds: Melee.defaultOdds,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            die6: 1,
            die7: 1,
        };
    },
    onAttackerChanged(v) {
        this.state.attack = v;
        this.state.odds = Melee.calculate(+v, +this.state.defend);
        this.onResolve();
    },
    onDefenderChanged(v) {
        this.state.defend = v;
        this.state.odds = Melee.calculate(+this.state.attack, +v);
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
        this.state.die5 = d[4].value;
        this.state.die6 = d[5].value;
        this.state.die7 = d[6].value;        
        this.onResolve();
    },
    onSetMelee(s, v) {
        if (s == 'attack') {
            let attack = +v;
            this.state.odds = Melee.calculate(attack, +this.state.defend);
            this.state.attack = attack.toString();
            this.onResolve();
        }
        else if (s == 'defend') {
            let defend = +v;
            this.state.odds = Melee.calculate(+this.state.attack, defend);
            this.state.defend = defend.toString();
            this.onResolve();
        }
    },
    onAddMelee(s, v) {
        if (s == 'attack') {
            let attack = ((+this.state.attack) + (+v));
            this.state.odds = Melee.calculate(attack, +this.state.defend);
            this.state.attack = attack.toString();
            this.onResolve();
        }
        else if (s == 'defend') {
            let defend = ((+this.state.defend) + (+v));
            this.state.odds = Melee.calculate(+this.state.attack, defend);
            this.state.defend = defend.toString();
            this.onResolve();
        }
    },
    onResolve() {
        this.setState(this.state);
    },    
    render() {
        return (
            <View style={{flex: 1}}>
              <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
                <View style={{flex: .75, flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                    <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5,this.state.die6,this.state.die7]}
                        onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
                <View style={{flex: 1}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
                <View style={{flex:2}}>
                    <CombatResultsView odds={this.state.odds}
                        results={Melee.resolvePossible((this.state.die1*10) + this.state.die2)}
                        combatdice={(this.state.die1*10) + this.state.die2}
                        lossdie={this.state.die3}
                        durationdie1={this.state.die4}
                        durationdie2={this.state.die5}
                        melee={true}
                        moraledice={(this.state.die6*10) + this.state.die7}                            
                    />
                </View>              
              </View>
              <View style={{flex:1.25}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <MeleeStrengthView label={'Attacker'} value={this.state.attack} onChanged={this.onAttackerChanged} />
                    </View>
                    <View style={{flex: 1}}>
                        <OddsView odds={Melee.odds} value={this.state.odds} onChanged={this.onOddsChanged} />
                    </View>
                    <View style={{flex: 2}}>
                        <MeleeStrengthView label={'Defender'} value={this.state.defend} onChanged={this.onDefenderChanged} />
                    </View>
                </View>
                <View style={{flex: 3.25}}>
                    <MeleeCalcView side={'attack'} onSet={this.onSetMelee}  onAdd={this.onAddMelee} />
                </View>
              </View>
          </View>
        );
    }
});

module.exports = MeleeResolutionView;
