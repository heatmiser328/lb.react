'use strict'
var React = require('react');
import { View, Text } from 'react-native';
import {DiceRoll} from 'react-native-dice';
var MeleeStrengthView = require('./meleeStrengthView');
var OddsView = require('./oddsView');
var ResultsView = require('./meleeResultsView');
var DiceModifiersView = require('./diceModifiersView');
var MeleeCalcView = require('./meleeCalcView');
var Melee = require('./services/melee');
var LeaderLoss = require('./services/leaderloss');
var Base6 = require('./services/base6');

var MeleeResolutionView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'black', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'black', dotcolor:'red'}
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
            result: '',
            leader: '',
            loss: '',
            mortal: false
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
        this.onResolve();
    },
    onResolve() {
		let meleeDice = (this.state.die1*10) + this.state.die2;
		this.state.result = Melee.resolve(this.state.odds, meleeDice);
		let lloss = LeaderLoss.resolve(meleeDice, this.state.die3, this.state.die4, this.state.die5, true) || {};
        this.state.leader = lloss.leader;
        this.state.loss = lloss.result;
        this.state.mortal = lloss.mortal;
        this.setState(this.state);
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
    render() {
        return (
          <View style={{flex: 1}}>
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
              <View style={{flex: 3}}>
                <MeleeCalcView side={'attack'} onSet={this.onSetMelee}  onAdd={this.onAddMelee} />
              </View>
              <View style={{flex: 2}}>
                  <View style={{flex: 1}}>
                      <ResultsView value={this.state.result} leader={this.state.leader} loss={this.state.loss} mortal={this.state.mortal} />
                  </View>
                  <View style={{flex: 1}}>
                      <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5]}
                              onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                  </View>
                  <View style={{flex: 1}}>
                      <DiceModifiersView onChange={this.onDiceModifierChanged} />
                  </View>
              </View>
          </View>
        );
    }
});

module.exports = MeleeResolutionView;
