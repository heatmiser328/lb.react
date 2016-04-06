'use strict'
var React = require('react-native');
var { View, Text } = React;
var FireAttackerView = require('./fireAttackerView');
var FireDefenderView = require('./fireDefenderView');
var OddsView = require('./oddsView');
var ResultsView = require('./resultsView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('../../widgets/diceRoll');
var Fire = require('../../core/fire');
var LeaderLoss = require('../../core/leaderloss');
var Base6 = require('../../core/base6');

var dice = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'},
    {num: 1, low: 1, high: 6, color: 'blue'},
    {num: 1, low: 1, high: 6, color: 'blackw'},
    {num: 1, low: 1, high: 6, color: 'blackr'}
];

var FireView = React.createClass({
    getInitialState() {
        return {
            attack: 1,
            defend: 1,
            incr: 1,
            odds: Fire.defaultOdds,
            mod13: false,
            mod12: false,
            mod32: false,
            modCann: false,
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
        this.setState({attack: v});
        this.onResolve();
    },
    onAttackerModifierChanged(m, v) {
        console.log(m + ' = ' + v);
        if (m == 'Cannister') {
            this.setState({modCann: v});
        } else {
            var state = {};
            var a = this.state.attack;
            if (m == '1/3') {
                state.mod13 = v;
                a = v ? a / 3 : a * 3;
            }
            else if (m == '1/2') {
                state.mod12 = v;
                a = v ? a / 2 : a * 2;
            }
            else if (m == '3/2') {
                a = v ? a * 1.5 : a / 1.5;
                state.mod32 = v;
            }
            state.attack = a;
            this.setState(state);
        }
        this.onResolve();
    },
    onDefenderChanged(v) {
        this.setState({defend: v});
        this.onResolve();
    },
    onDefenderIncrementsChanged(v) {
        this.setState({incr: v});
        this.onResolve();
    },
    onOddsChanged(v) {
        this.setState({odds: v});
        this.onResolve();
    },
    onDiceModifierChanged(v) {
        var m = +v;
        var d = (this.state.die1 * 10) + this.state.die2;
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
        // calc odds
        var odds = Fire.calculate(this.state.attack,  this.state.defend, this.state.modCann);
        // resolve fire
		var fireDice = (this.state.die1*10) + this.state.die2;
		var lossdie = this.state.die3;
		var durationdie1 = this.state.die4;
		var durationdie2 = this.state.die5;
		var results = Fire.resolve(odds, fireDice, this.state.incr);
		var lloss = LeaderLoss.resolve(fireDice, lossdie, durationdie1, durationdie2) || {};
        this.setState({
            odds: odds,
            result: results,
            leader: lloss.leader,
            loss: lloss.result,
            mortal: lloss.mortal
        });
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1, marginTop: 5}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FireAttackerView value={this.state.attack} mods={[this.state.mod13,this.state.mod12,this.state.mod32,this.state.modCann]} onChanged={this.onAttackerChanged} onModifierChanged={this.onAttackerModifierChanged} />
                    </View>
                    <View style={{flex: 1}}>
    					<FireDefenderView value={this.state.defend} incr={this.state.incr} onChanged={this.onDefenderChanged} onIncrementsChanged={this.onDefenderIncrementsChanged} />
    				</View>
                </View>
                <View style={{flex: .5, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <OddsView odds={Fire.odds} value={this.state.odds} onChanged={this.onOddsChanged} />
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
    }
});

module.exports = FireView;
