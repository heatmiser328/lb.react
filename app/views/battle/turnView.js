'use strict'

var React = require('react-native');
var { View, Text, StyleSheet } = React;
var Subscribable = require('Subscribable');
var SpinSelect = require('../../widgets/spinSelect');
var Current = require('../../core/current');

var styles = StyleSheet.create({
  container: {
    //flex: 1,
    //marginTop: 30,
    //backgroundColor: 'rgba(0,0,0,0.01)',
    height: 90,
  },
  spin: {

  }
});

var TurnView = React.createClass({
    mixins: [Subscribable.Mixin],

    getInitialState() {
      return {
        turn: Current.turn(),
        phase: Current.phase(),
      };
    },
    componentDidMount: function() {        
        this.addListenerOn(this.props.events, 'reset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        this.setState({turn: Current.turn(), phase: Current.phase()});
    },
    onPrevTurn() {
        console.log('previous turn');
        Current.prevTurn(this.props.current)
        .then((turn) => {
            this.setState({turn: turn});
        })
        .done();
    },
    onNextTurn() {
        console.log('next turn');
        Current.nextTurn(this.props.current)
        .then((turn) => {
            this.setState({turn: turn});
        })
        .done();
    },
    onPrevPhase() {
        console.log('previous phase');
        Current.prevPhase(this.props.current)
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase});
        })
        .done();
    },
    onNextPhase() {
        console.log('next phase');
        Current.nextPhase(this.props.current)
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase});
        })
        .done();
    },
    render() {
        //console.log(this.props);
        return (
          <View style={styles.container}>
            <SpinSelect style={styles.spin} value={this.state.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
            <SpinSelect style={styles.spin} value={this.state.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
          </View>
        );
    }
});

module.exports = TurnView;
