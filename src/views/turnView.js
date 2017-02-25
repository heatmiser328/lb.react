import React from 'react';
import { View, Text, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import {SpinSelect} from 'react-native-nub';
import TurnPlayerView from './turnPlayerView';
import Icons from '../res';
import {prevTurn,nextTurn,prevPhase,nextPhase,save} from '../actions/current';
import getGame from '../selectors/game';
import getTurn from '../selectors/turn';
import getPhase from '../selectors/phase';

var TurnView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },        
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
    render() {
        //console.log(this.props);
        let iconwidth = this.state.width || 96;
        let iconheight = this.state.height || 88;
        return (
            <View style={{flexDirection: 'row', height: this.getHeight(), marginTop: this.getMarginTop(), marginLeft: 5, marginRight: 5}}>
                <View style={{flex: 1, marginRight: 2}} onLayout={this.onLayout}>
                    <Image style={{width: iconwidth,height: iconheight,resizeMode: 'contain'}} source={this.props.logo}/>
                </View>
                <View style={{flex: 4}}>
                    <SpinSelect value={this.props.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
                    <SpinSelect value={this.props.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
                </View>
                <View style={{flex: 1, marginLeft: 2}}>
                    <TurnPlayerView />
                </View>
            </View>
        );
    },
    getHeight() {
        let ratio = PixelRatio.get();        
        switch(ratio) {
            case 1:
            return 60;
            case 1.5:
            return 70;
            case 2:
            return 80;
            case 3:
            return 90;
            case 3.5:
            return 100;
            default:
            break;            
        }
        return 75;
    },
    getMarginTop() {
        let ratio = PixelRatio.get();        
        switch(ratio) {
            case 1:
            return 20;
            case 1.5:
            return 30;
            case 2:
            return 40;
            case 3:
            return 50;
            case 3.5:
            return 60;
            default:
            break;            
        }
        return 45;
    }    
});

const mapStateToProps = (state) => ({
    battle: getGame(state),
    turn: getTurn(state),
    phase: getPhase(state)
});

const mapDispatchToProps =  ({prevTurn,nextTurn,prevPhase,nextPhase,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnView);

