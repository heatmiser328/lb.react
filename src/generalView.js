'use strict'

var React = require('react');
import { View, Text } from 'react-native';
import {DiceRoll} from 'react-native-dice';
var ArtilleryView = require('./artilleryView');
var CavalryRecallView = require('./cavalryRecallView');
var VictoryView = require('./victoryView');
var Current = require('./services/current');

var dice1 = [
    {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
    {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
];

var dice2 = [
    {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'}
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
                <View style={{flex:1, flexDirection: 'row', marginRight: 0}}>
                    <DiceRoll dice={dice1} values={[this.state.die1,this.state.die2]} onRoll={this.onDice1Roll} />
                    <DiceRoll dice={dice2} values={[this.state.die3]} onRoll={this.onDice2Roll} />
                </View>
                {this.renderArtillery()}
                {this.renderCavalryRecall()}
                {this.renderVictory()}                
            </View>
        );
    },
    renderArtillery() {
        let battle = Current.battle();
        if (battle.hasOwnProperty('fire') && battle.fire.hasOwnProperty('artillery')) {
            return (
                <View style={{flex:3}}>
                    <ArtilleryView events={this.props.events} />
                </View>
            );
        }

        return <View style={{flex:3}}/>;
    },
    renderCavalryRecall() {
        let battle = Current.battle();
        if (battle.hasOwnProperty('charge') && battle.charge.hasOwnProperty('recall')) {
            return (
                <View style={{flex:3}}>
                    <CavalryRecallView events={this.props.events} />
                </View>
            );
        }

        return <View style={{flex:3}}/>;
    },
    renderVictory() {
		let s = Current.scenario();
		if (s.scenario.hasOwnProperty('victory')) {
            return (
                <View style={{flex:2}}>
                    <VictoryView events={this.props.events} />
                </View>
            );
        }
        return <View style={{flex:2}}/>;
    }
});

module.exports = GeneralView;
