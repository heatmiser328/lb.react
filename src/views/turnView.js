import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {SpinSelect} from 'react-native-nub';
import Icons from '../res';
import {prevTurn,nextTurn,prevPhase,nextPhase,nextPlayer,save} from '../actions/current';
import getGame from '../selectors/game';
import getTurn from '../selectors/turn';
import getPhase from '../selectors/phase';
import getPlayer from '../selectors/player';

var TurnView = React.createClass({
    onPrevTurn() {
        //console.log('previous turn');
        this.props.prevTurn();
        this.props.save().done();
    },
    onNextTurn() {
        //console.log('next turn');
        this.props.nextTurn();
        this.props.save().done();
    },
    onPrevPhase() {
        //console.log('previous phase');
        this.props.prevPhase();
        this.props.save().done();
    },
    onNextPhase() {
        //console.log('next phase');
        this.props.nextPhase();
        this.props.save().done();
    },
    onNextPlayer() {
        //console.log('next player');
        this.props.nextPlayer();
        this.props.save().done();
    },
    render() {
        //console.log(this.props);        
        return (
            <View style={{flexDirection: 'row', height: 90, marginTop: 60, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1}}>
                    <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={this.props.logo}/>
                </View>
                <View style={{flex: 4}}>
                    <SpinSelect value={this.props.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
                    <SpinSelect value={this.props.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={this.onNextPlayer} >
                        <Image style={{width: 96,height: 88,resizeMode: 'contain'}} source={Icons[this.props.player]}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    battle: getGame(state),
    turn: getTurn(state),
    phase: getPhase(state),
    player: getPlayer(state)
});

const mapDispatchToProps =  ({prevTurn,nextTurn,prevPhase,nextPhase,nextPlayer,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnView);

