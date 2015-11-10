'use strict'

var React = require('react-native');
var { View, Text, StyleSheet } = React;
var DiceRoll = require('../../widgets/diceRoll');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
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
          ]
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
        <Text>
          Some fire combat stuff
        </Text>
        <DiceRoll dice={this.state.dice} onRoll={this.onResolve} onDie={this.onResolve}/>
      </View>
    );
  }
});

module.exports = FireView;
