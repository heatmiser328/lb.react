'use strict'

var React = require('react-native');
var { View, Text, TouchableOpacity, Image } = React;
var Button = require('apsl-react-native-button');
var Dice = require('../core/dice');
var range = require('../core/range');
var Images = require('./dieImages');

var DieButton = React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
      return true;
    },
    onPress() {
        this.props.onPress && this.props.onPress({die: this.props.die});
    },
    render() {
        //console.log(this.props.image);
        let image = Images(this.props.image);
        return (
            <TouchableOpacity style={{marginRight: 5}} onPress={this.onPress} >
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
        //style={{flex: 1,padding: 5, alignItems: 'center'}}
        return (
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 4, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}>
                {this.state.dice.map((die, i) => {
                    return (
                        <DieButton die={i+1} image={die.image()} onPress={this.onDie} />
                    );
                })}
            </View>
            <Button
                style={{flex: 1,height: 64,marginTop: 7,marginRight: 5,backgroundColor: '#3F51B5'}}
                textStyle={{fontSize: 18,color: '#FFF'}} onPress={this.onRoll}>
                Roll
            </Button>
          </View>
        );
    }
});

module.exports = DiceRoll;
