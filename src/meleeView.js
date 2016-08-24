'use strict'
var React = require('react');
import { View, Text, Navigator } from 'react-native';
var MeleeStrengthView = require('./meleeStrengthView');
var OddsView = require('./oddsView');
var ResultsView = require('./meleeResultsView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var MeleeCalcView = require('./meleeCalcView');
var Melee = require('./services/melee');
var LeaderLoss = require('./services/leaderloss');
var Base6 = require('./services/base6');

var dice = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'},
    {num: 1, low: 1, high: 6, color: 'blue'},
    {num: 1, low: 1, high: 6, color: 'blackw'},
    {num: 1, low: 1, high: 6, color: 'blackr'}
];

var MeleeView = React.createClass({
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
        let odds = Melee.calculate(+v, +this.state.defend);
        this.setState({attack: v, odds: odds});
        this.onResolve();
    },
    onDefenderChanged(v) {
        let odds = Melee.calculate(+this.state.attack, +v);
        this.setState({defend: v, odds: odds});
        this.onResolve();
    },
    onOddsChanged(v) {
        this.setState({odds: v});
        this.onResolve();
    },
    onDiceModifierChanged(v) {
        let m = +v;
        let d = (this.state.die1 * 10) + this.state.die2;
        d = Base6.add(d, m);
        this.setState({
            die1: Math.floor(d / 10),
            die2: d % 10
        });
        this.onResolve();
    },
    onDieChanged(d,v) {
        let state = {};
        state['die'+d] = v;
        this.setState(state);
        this.onResolve();
    },
    onDiceRoll(d) {
        this.setState({die1: d[0].value,die2: d[1].value, die3: d[2].value, die4: d[3].value, die5: d[4].value});
        this.onResolve();
    },
    onResolve(e) {
		let meleeDice = (this.state.die1*10) + this.state.die2;
		let lossdie = this.state.die3;
		let durationdie1 = this.state.die4;
		let durationdie2 = this.state.die5;
		let results = Melee.resolve(this.state.odds, meleeDice);
		let lloss = LeaderLoss.resolve(meleeDice, lossdie, durationdie1, durationdie2, true) || {};
        this.setState({
            result: results,
            leader: lloss.leader,
            loss: lloss.result,
            mortal: lloss.mortal
        });
    },
    onAddMelee(s, v) {
        if (s == 'attack') {
            let attack = ((+this.state.attack) + (+v));
            let odds = Melee.calculate(attack, +this.state.defend);
            this.setState({attack: attack.toString(), odds: odds});
            this.onResolve();
        }
        else if (s == 'defend') {
            let defend = ((+this.state.defend) + (+v));
            let odds = Melee.calculate(+this.state.attack, defend);
            this.setState({defend: defend.toString(), odds: odds});
            this.onResolve();
        }
    },
    render() {
        return (
            <Navigator
              ref="navigator"
              initialRoute={{name: 'melee', index: 0}}
              renderScene={(route, navigator) => {
                  if (route.index == 1) {
                      return (
                          <MeleeCalcView side={route.side} onAdd={this.onAddMelee} onClose={() => {this.refs.navigator.pop();}}/>
                      );
                  }
                  return (
                      <View style={{flex: 1, marginTop: 5}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                              <View style={{flex: 1}}>
                                  <MeleeStrengthView label={'Attacker'} value={this.state.attack} onChanged={this.onAttackerChanged}
                                      onAdd={() => {
                                          this.refs.navigator.push({name: 'calculator', index: 1, side: 'attack'});
                                      }}
                                    />
                              </View>
                              <View style={{flex: 1}}>
                                  <MeleeStrengthView label={'Defender'} value={this.state.defend} onChanged={this.onDefenderChanged}
                                      onAdd={() => {
                                          this.refs.navigator.push({name: 'calculator', index: 1, side: 'defend'});
                                      }}
                                   />
                              </View>
                          </View>
                          <View style={{flex: .5, flexDirection: 'row'}}>
                              <View style={{flex: 1}}>
                                  <OddsView odds={Melee.odds} value={this.state.odds} onChanged={this.onOddsChanged} />
                              </View>
                              <View style={{flex: 3}}>
                                  <ResultsView value={this.state.result} leader={this.state.leader} loss={this.state.loss} mortal={this.state.mortal} />
                              </View>
                          </View>
                          <View style={{flex: .75}}>
                              <DiceRoll dice={dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5]}
                                      onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                          </View>
                          <View style={{flex: 3}}>
                              <DiceModifiersView onChange={this.onDiceModifierChanged} />
                          </View>
                      </View>
                  );
              }}
            />
        );
    }
});

module.exports = MeleeView;
