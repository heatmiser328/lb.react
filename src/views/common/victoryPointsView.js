import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {SpinNumeric,Style} from 'react-native-nub';
import Icons from '../../res';
import {setVictory,save} from '../../actions/current';
import getVictory from '../../selectors/victory';

var VictoryLevel = React.createClass({
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
    render() {
        let iconsize = (Math.min(this.state.height, this.state.width) * 0.9) || 16;
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent:'center',alignItems:'center'}} onLayout={this.onLayout}>
                <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain'}} source={Icons[this.props.side]}/>
                <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'center', marginLeft: Style.Padding.pad(20)}}>{this.props.level}</Text>
            </View>            
        );
    }
});

var VictoryPoints = React.createClass({
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
    render() {
        let iconsize = (Math.min(this.state.height, this.state.width) * 0.9) || 16;        
        return (
            <View style={{flex:1,flexDirection:'row'}} onLayout={this.onLayout}>
                <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain'}} source={Icons[this.props.side]}/>
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
    vp1: state.current.victory['0'],
    vp2: state.current.victory['1'],
    level: getVictory(state)
});

const mapDispatchToProps =  ({setVictory,save});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(VictoryPointsView);

