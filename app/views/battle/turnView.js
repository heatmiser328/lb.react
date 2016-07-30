'use strict'

var React = require('react-native');
var { View, Text, Image, TouchableOpacity } = React;
var Subscribable = require('Subscribable');
var SpinSelect = require('../../widgets/spinSelect');
var icons = require('../../../icons');
var Current = require('../../core/current');

var TurnView = React.createClass({
    mixins: [Subscribable.Mixin],

    getInitialState() {
      return {
        turn: Current.turn(),
        phase: Current.phase(),
        player: Current.player()
      };
    },
    componentDidMount: function() {
        this.addListenerOn(this.props.events, 'reset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        this.setState({turn: Current.turn(), phase: Current.phase(), player: Current.player()});
    },
    onPrevTurn() {
        //console.log('previous turn');
        Current.prevTurn(this.props.current)
        .then((turn) => {
            this.setState({turn: turn});
        })
        .done();
    },
    onNextTurn() {
        //console.log('next turn');
        Current.nextTurn(this.props.current)
        .then((turn) => {
            this.setState({turn: turn});
        })
        .done();
    },
    onPrevPhase() {
        //console.log('previous phase');
        Current.prevPhase(this.props.current)
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase, player: Current.player()});
        })
        .done();
    },
    onNextPhase() {
        //console.log('next phase');
        Current.nextPhase(this.props.current)
        .then((phase) => {
            this.setState({turn: Current.turn(), phase: phase, player: Current.player()});
        })
        .done();
    },
    onNextPlayer() {
        //console.log('next player');
        Current.nextPlayer()
        .then((player) => {
            this.setState({player: player});
        })
        .done();
    },
    render() {
        //console.log(this.props);
        return (
          <View style={{flexDirection: 'row', height: 90, marginLeft: 10, marginRight: 10}}>
            <View style={{flex: 1}}>
                <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={this.props.logo}/>
            </View>
            <View style={{flex: 4}}>
                <SpinSelect value={this.state.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
                <SpinSelect value={this.state.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={this.onNextPlayer} >
                    <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={icons[this.state.player]}/>
                </TouchableOpacity>
            </View>
          </View>
        );
    }
});

module.exports = TurnView;
