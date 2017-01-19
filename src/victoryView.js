'use strict'

var React = require('react');
import { View, Text, Image } from 'react-native';
import {SpinNumeric} from 'react-native-app-nub';
var Icons = require('./res/icons');
var Current = require('./services/current');

var VictoryLevel = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold',textAlign: 'center'}}>{this.props.level}</Text>
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

var VictoryView = React.createClass({
    getInitialState() {
        return {
            side1: Current.victory(0),
            side2: Current.victory(1)
        };
    },
    componentDidMount: function() {
        this.props.events.addListener('reset', this.onReset);
    },
    onReset() {
        this.setState({side1: Current.victory(0),side2: Current.victory(1)});
    },    
    onSide1VPChanged(v) {
        Current.victory(0, +v);
        Current.save().then(() => this.setState({side1: +v}));        
    },    
    onSide2VPChanged(v) {
        Current.victory(1, +v);
        Current.save().then(() => this.setState({side2: +v}));
    },    
    render() {        
        let sides = Current.scenario().sides;        
        return (
            <View style={{flex:1, justifyContent:'flex-start'}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Victory</Text>
                <VictoryLevel level={Current.victoryLevel()} />
                <View style={{flex:1, flexDirection:'row',marginBottom:15}}>
                    <VictoryPoints side={sides[0]} value={this.state.side1.toString()} onChanged={this.onSide1VPChanged} />
                    <VictoryPoints side={sides[1]} value={this.state.side2.toString()} onChanged={this.onSide2VPChanged} />
                </View>                
            </View>
        );
    }
});

module.exports = VictoryView;

