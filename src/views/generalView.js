import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {DiceRoll} from 'react-native-dice';
import ArtilleryView from './artilleryView';
import getRules from '../selectors/rules';

var GeneralView = React.createClass({
    dice1: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],
    dice2: [
        {num: 1, low: 0, high: 0, diecolor: '', dotcolor:''},
        {num: 1, low: 1, high: 6, diecolor: 'blue', dotcolor:'white'}
    ],    
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
        this.setState({die3: d[1].value});
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <View style={{flex: 1, flexDirection:'row', alignItems:'center', marginTop: 2, marginBottom: 3}}>
                    <View style={{flex:1}} />
                    <DiceRoll dice={this.dice2} values={[0,this.state.die3]} onRoll={this.onDice2Roll} />
                </View>
                <View style={{flex: 1, flexDirection:'row', alignItems:'center', marginTop: 3}}>
                    <View style={{flex:1}} />    
                    <DiceRoll dice={this.dice1} values={[this.state.die1,this.state.die2]} onRoll={this.onDice1Roll} />
                </View>                
                {this.renderArtillery()}
            </View>
        );
    },
    renderArtillery() {
        return (
            <View style={{flex:6}}>
                {(this.props.rules.hasOwnProperty('fire') && this.props.rules.fire.hasOwnProperty('artillery'))
                    ? <ArtilleryView />
                    : null
                }                
            </View>
        );
    },
});

const mapStateToProps = (state) => ({
    rules: getRules(state)
});

module.exports = connect(
  mapStateToProps
)(GeneralView);