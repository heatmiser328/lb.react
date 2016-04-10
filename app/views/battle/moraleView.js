'use strict'
var React = require('react-native');
var { View, Text } = React;
var SpinNumeric = require('../../widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
var ResultsView = require('./resultsView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('../../widgets/diceRoll');
var Base6 = require('../../core/base6');

var dice = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'}
];

var MoraleView = React.createClass({
    getInitialState() {
        return {
            morale: 11,
            die1: 1,
            die2: 1,
            result: 'Fail'
        };
    },
    onQuickValue(v) {
        this.setState({morale: v});
        this.onResolve();
    },
    onMoraleChanged(v) {
        this.setState({morale: v});
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
        this.setState({die1: d[0].value,die2: d[1].value});
        this.onResolve();
    },
    onResolve(e) {
        let moraleDice = (this.state.die1*10) + this.state.die2;
        this.setState({result: (moraleDice > this.state.morale) ? 'Pass' : 'False'});
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1, marginTop: 5}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 25}} />
                    <View style={{flex: 50}}>
                        <SpinNumeric value={this.state.morale} values={Base6.values} integer={true} onChanged={this.onMoraleChanged} />
                    </View>
                    <View style={{flex: 25}} />
                </View>
                <View style={{flex: 1}}>
                    <QuickValuesView values={[16,26,36,46,56,66]} onChanged={this.onQuickValue}/>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <ResultsView value={this.state.result} />
                    </View>
                    <View style={{flex: 1}}>
                        <DiceRoll dice={dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 5}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    }
});

module.exports = MoraleView;
