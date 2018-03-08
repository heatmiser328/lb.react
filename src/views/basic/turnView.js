import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {Style,SpinSelect} from 'react-native-nub';
import TurnPlayerView from '../common/turnPlayerView';
import Icons from '../../res';
import {prevTurn,nextTurn} from '../../actions/current';
import getGame from '../../selectors/game';
import getTurn from '../../selectors/turn';

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
    render() {
        //console.log(this.props);
        let iconwidth = this.state.width || 96;
        let iconheight = this.state.height || 88;
        return (
            <View style={{flexDirection: 'row', alignItems:'center', height: Style.Scaling.scale(75), marginLeft: 5, marginRight: 5}}>
                <View style={{flex: 1, justifyContent:'center', marginRight: 2}} onLayout={this.onLayout}>
                    <Image style={{width: iconwidth,height: iconheight,resizeMode: 'contain'}} source={Icons[this.props.logo]}/>
                </View>
                <View style={{flex: 4}}>
                    <SpinSelect fontSize={Style.Font.fontScale(20)} value={this.props.turn} onPrev={this.onPrevTurn} onNext={this.onNextTurn} />                    
                </View>
                <View style={{flex: 1, marginLeft: 2}}>
                    <TurnPlayerView />
                </View>                
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    turn: getTurn(state)
});

const mapDispatchToProps =  ({prevTurn,nextTurn});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnView);

