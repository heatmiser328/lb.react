'use strict'

var React = require('react-native');
var { View, Text, StyleSheet } = React;
var SpinNumeric = require('../../widgets/spinNumeric');
var DiceRoll = require('../../widgets/diceRoll');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },

  fireContainer: {
    flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  fireHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20
  }

});

var FireAttacker = React.createClass({
  render() {
    return (
      <View style={[styles.fireContainer, {backgroundColor: 'red'}]}>
        <Text style={styles.fireHeader}>Attacker</Text>
        <SpinNumeric value={this.props.value} min={1} onChanged={this.props.onChanged} />
      </View>
    );
  }
});

var FireDefender = React.createClass({
  render() {
    return (
      <View style={styles.fireContainer}>
        <Text style={styles.fireHeader}>Defender</Text>
      </View>
    );
  }
});

var Odds = React.createClass({
  render() {
    return (
      <View>
        <Text style={styles.label}>Odds</Text>
      </View>
    );
  }
});

var DiceModifiers = React.createClass({
  render() {
    return (
      <View>
        <Text style={styles.label}>Dice Modifiers</Text>
      </View>
    );
  }
});

var Results = React.createClass({
  render() {
    return (
      <View>
        <Text style={styles.label}>Results</Text>
      </View>
    );
  }
});

var FireView = React.createClass({
  getInitialState() {
      return {
          dice: [
              {num: 1, low: 1, high: 6, color: 'red'},
              {num: 1, low: 1, high: 6, color: 'white'},
              {num: 1, low: 1, high: 6, color: 'blue'},
              {num: 1, low: 1, high: 6, color: 'blackw'},
              {num: 1, low: 1, high: 6, color: 'blackr'}
          ],
          attack: 1,
          defend: 1,
      };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onResolve(e) {
      console.log('fire: resolve');
  },
  render() {
    //console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FireAttacker style={styles.attacker} value={this.state.attack} />
          <FireDefender style={styles.defender}/>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Odds style={{flex: 25}}/>
          <Results style={{flex: 75}} />
        </View>
        <DiceRoll dice={this.state.dice} onRoll={this.onResolve} onDie={this.onResolve}/>
        <DiceModifiers />
      </View>
    );
  }
});

module.exports = FireView;
