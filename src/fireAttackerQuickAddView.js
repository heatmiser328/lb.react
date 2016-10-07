'use strict'
var React = require('react');
import { View, Text, Switch } from 'react-native';
import {SpinNumeric,IconButton} from 'app-nub.react';
var FireAttackerValuesView = require('./fireAttackerValuesView');
var Icons = require('./res/icons');
var Current = require('./services/current');

var FireAttackerQuickAddView = React.createClass({
    getInitialState() {
        return {
            size: '1',
            factor: '1',
            mods: {},
            value: '1'
        };
    },
    onSizeChanged(v) {
        this.state.size = v;
        this.updateValue();
    },
    onFactorChanged(v) {
        this.state.factor = v;
        this.updateValue();
    },
    onEffectChanged(v) {
        this.state.size = v.density.toString();
        this.state.factor = v.factor.toString();
        this.updateValue();
    },
    onModifier(m) {
        return (v) => {
            this.state.mods[m] = v;
            this.updateValue();
        }
    },
    onSet() {
        this.props.onSet && this.props.onSet(+this.state.value);
    },
    onAdd() {
        this.props.onAdd && this.props.onAdd(+this.state.value);
    },
    updateValue() {
        this.state.value = this.calcValue().toFixed(1);
        this.setState(this.state);
    },
    calcValue(state) {
        state = state || this.state;

        //value = size * fire multiplier * modifiers
        let value = +state.size * +state.factor;
        if (state.mods['1/2']) {
            value /= 2.0;
        }
        if (state.mods['3/2']) {
            value *= 1.5;
        }
        if (state.mods['1/3']) {
            value /= 3.0;
        }
        return value;
    },
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Size</Text>
                        <View>
                        <SpinNumeric value={this.state.size} min={0} max={30} onChanged={this.onSizeChanged} />
                        </View>
                    </View>
                    <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Factor</Text>
                        <View>
                        <SpinNumeric value={this.state.factor} min={0} max={30} onChanged={this.onFactorChanged} />
                        </View>
                    </View>
                    <View style={{flex: 1, alignSelf: 'stretch'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Attack</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', backgroundColor: 'gray', textAlign: 'center'}}>
                            {this.state.value}
                        </Text>
                    </View>
                    <View style={{flex:.5}}>
                        <View style={{margin:2}}>
                            <IconButton image={Icons['equal']} height={32} width={32} resizeMode='stretch' onPress={this.onSet} />
                        </View>
                        <View style={{margin:2}}>
                            <IconButton image={Icons['add']} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                        </View>
                    </View>
                </View>
                <View style={{flex: .25, flexDirection: 'row'}}>
                    {['1/3','1/2','3/2'].map((v, i) => {
                        return (
                            <View key={i} style={{flex: 1,flexDirection: 'row', alignItems: 'center'}}>
                                <Text>{v}</Text>
                                <Switch value={this.state.mods[v]} onValueChange={this.onModifier(v)} />
                            </View>
                        );
                    })}
                </View>
                <View style={{flex:3}}>
                    <FireAttackerValuesView events={this.props.events} onSelect={this.onEffectChanged} />
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerQuickAddView;
