import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric} from 'react-native-nub';
import Icons from '../res';
import {setVictory,save} from '../actions/current';
import getGame from '../selectors/game';
import getVictory from '../selectors/victory';

var VictoryLevel = React.createClass({
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent:'center',alignItems:'center'}}>
                <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.props.side]}/>
                <Text style={{fontWeight:'bold',fontSize:18,textAlign:'center', marginLeft: 20}}>{this.props.level}</Text>
            </View>            
        );
    }
});

var VictoryPoints = React.createClass({
    render() {
        return (
            <View style={{flex:1,flexDirection:'row'}}>
                <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons[this.props.side]}/>
                <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
            </View>
        );
    }
});

var VictoryPointsView = React.createClass({
    onSide1VPChanged(v) {
        this.props.setVictory(0, +v);
        this.props.save().done();
    },    
    onSide2VPChanged(v) {
        this.props.setVictory(1, +v);
        this.props.save().done();
    },    
    render() {        
        return (
            <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginLeft:30, marginRight:30}}>
                <VictoryLevel side={this.props.level.side} level={this.props.level.level} />
                <VictoryPoints side={this.props.battle.players[0]} value={this.props.vp1.toString()} onChanged={this.onSide1VPChanged} />
                <VictoryPoints side={this.props.battle.players[1]} value={this.props.vp2.toString()} onChanged={this.onSide2VPChanged} />
                <View style={{flex:5}} />
            </View>
        );
    }
});


const mapStateToProps = (state) => ({
    battle: getGame(state),
    vp1: state.current.victory['0'],
    vp2: state.current.victory['1'],
    level: getVictory(state)
});

const mapDispatchToProps =  ({setVictory,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(VictoryPointsView);

