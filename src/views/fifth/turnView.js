import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {SpinSelect} from 'react-native-nub';
import ManeuverUnit from './maneuverUnit';
import Icons from '../../res';
import Style from '../../services/style';
import {prevTurn,nextTurn,prevPhase,nextPhase,prevSubPhase,nextSubPhase} from '../../actions/current';
import getGame from '../../selectors/game';
import getTurn from '../../selectors/turn';
import getPhase from '../../selectors/phase';
import getSubPhase from '../../selectors/subphase';

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
    },
    onNextTurn() {
        //console.log('next turn');
        this.props.nextTurn();        
    },
    onPrevPhase() {
        //console.log('previous phase');
        this.props.prevPhase();        
    },
    onNextPhase() {
        //console.log('next phase');
        this.props.nextPhase();        
    },
    onPrevSubPhase() {
        //console.log('previous subphase');
        this.props.prevSubPhase();        
    },
    onNextSubPhase() {
        //console.log('next subphase');
        this.props.nextSubPhase();        
    },    
    render() {
        //console.log(this.props);
        let iconwidth = this.state.width || 96;
        let iconheight = this.state.height || 88;
        let mu = this.props.mu || {};        
        return (
            <View style={{flexDirection: 'row', alignItems:'center', height: Style.Scaling.scale(95), marginLeft: 5, marginRight: 5}}>
                <View style={{flex: 1, justifyContent:'center', marginRight: 2}} onLayout={this.onLayout}>
                    <Image style={{width: iconwidth,height: iconheight,resizeMode: 'contain'}} source={Icons[this.props.logo]}/>
                </View>
                <View style={{flex: 4}}>
                    <SpinSelect fontSize={Style.Font.fontScale(20)} value={this.props.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />
                    <SpinSelect fontSize={Style.Font.fontScale(20)} value={this.props.phase} onPrev={this.onPrevPhase} onNext={this.onNextPhase} />
                    <SpinSelect fontSize={Style.Font.fontScale(20)} value={this.props.subphase} onPrev={this.onPrevSubPhase} onNext={this.onNextSubPhase} />
                </View>
                <View style={{flex:1}}>
                    <ManeuverUnit item={mu} size={64/*Math.min(iconheight,iconwidth)*/} /> 
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    turn: getTurn(state),
    phase: getPhase(state),
    subphase: getSubPhase(state),
    mu: state.current.maneuver.mu
});

const mapDispatchToProps =  ({prevTurn,nextTurn,prevPhase,nextPhase,prevSubPhase,nextSubPhase});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnView);

