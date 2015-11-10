'use strict'

var React = require('react-native');
var { View, Text, TouchableOpacity, Image, StyleSheet } = React;
var Button = require('apsl-react-native-button');
var Dice = require('../core/dice');
var range = require('../core/range');
var Images = require('./dieImages');

var styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    //backgroundColor: 'blue',
  },
  die: {
      //width: 50,
  },
  dieButton: {
      flex: 1,
      padding: 5,
      //backgroundColor: 'red',
      alignItems: 'center',
  },
  roll: {

  },
  rollButton: {
      flex: 1,
      width: 64,
      height: 64,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 25,
      //padding: 15,
      backgroundColor: '#3F51B5'
  },
  rollText: {
      //paddingTop: 50,
      fontSize: 18,
      color: '#FFF'
  }
});

var DieButton = React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
      return true;
    },
    onPress() {
        this.props.onPress && this.props.onPress({die: this.props.die});
    },
    render() {
        console.log(this.props.image);
        let image = Images(this.props.image);
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.dieButton}>
                <Image source={image} />
            </TouchableOpacity>
        );
    }
});

var DiceRoll = React.createClass({
    getInitialState() {
        let state = {
            dice: new Dice.Dice(this.props.dice)
        };
        state.dice.each((die, i) => {
            state[i] = {
                value: die.value(),
                image: die.image()
            };
        });

        return state;
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    componentWillMount: function() {
    },
    onRoll(e) {
      console.log('dice: roll');
      this.state.dice.roll();
      let state = {};
      this.state.dice.each((die, i) => {
          state[i] = {
              value: die.value(),
              image: die.image()
          };
      });
      this.setState(state);

      this.props.onRoll && this.props.onRoll(this.state.dice.dice());
    },
    onDie(e) {
      console.log('dice: die');
      let die = this.state.dice.dieEx(e.die);
      die.increment();
      let state = {};
      state[e.die] = {
          value: die.value(),
          image: die.image()
      };
      this.setState(state);
      this.props.onDie && this.props.onDie(this.state.dice.dice());
    },
    render() {
        return (
          <View style={styles.container}>
            {this.state.dice.map((die, i) => {
                return (
                    <DieButton style={styles.die} die={i+1} image={die.image()} onPress={this.onDie} />
                );
            })}
            <Button style={styles.rollButton} textStyle={styles.rollText} onPress={this.onRoll} >
                Roll
            </Button>
          </View>
        );
    }
});

module.exports = DiceRoll;
