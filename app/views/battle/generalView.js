'use strict'

var React = require('react-native');
var { View, Text } = React;
var DiceRoll = require('../../widgets/diceRoll');
var dice1 = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'}
];

var dice2 = [
    {num: 1, low: 1, high: 6, color: 'blue'}
];


var GeneralView = React.createClass({
    getInitialState() {
        return {
            die1: 1,
            die2: 1,
            die3: 1
        };
    },
    onDice1Roll(d) {
        this.setState({die1: d[0].value,die2: d[1].value});
    },
    onDice2Roll(d) {
        this.setState({die3: d[0].value});
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1, marginTop: 5, justifyContent: 'flex-start'}}>
                <View style={{marginRight: 200}}>
                    <DiceRoll dice={dice1} values={[this.state.die1,this.state.die2]} onRoll={this.onDice1Roll} />
                </View>
                <View style={{marginRight: 200}}>
                    <DiceRoll dice={dice2} values={[this.state.die3]} onRoll={this.onDice2Roll} />
                </View>
            </View>
        );
    }
});

module.exports = GeneralView;
