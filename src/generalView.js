'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var DiceRoll = require('./widgets/diceRoll');
var ArtilleryView = require('./artilleryView');
var Current = require('./services/current');

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
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                {this.renderArtillery()}
                <View style={{flex:1, marginRight: 200}}>
                    <DiceRoll dice={dice1} values={[this.state.die1,this.state.die2]} onRoll={this.onDice1Roll} />
                </View>
                <View style={{flex:1, marginRight: 200}}>
                    <DiceRoll dice={dice2} values={[this.state.die3]} onRoll={this.onDice2Roll} />
                </View>
                <View style={{flex:3}} />
            </View>
        );
    },
    renderArtillery() {
        let battle = Current.battle();
        if (battle.hasOwnProperty('fire') && battle.fire.hasOwnProperty('artillery')) {
            return (
                <View style={{flex:1}}>
                    <ArtilleryView events={this.props.events} />
                </View>
            );
        }

        return null;
    }
});

module.exports = GeneralView;
