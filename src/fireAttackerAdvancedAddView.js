'use strict'
var React = require('react');
import { View, Text, Switch } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var FireAttackerValuesView = require('./fireAttackerValuesView');
var QuickValuesView = require('./quickValuesView');
var IconButton = require('./widgets/iconButton');
var Current = require('./services/current');

var FireAttackerAdvancedAddView = React.createClass({
    getInitialState() {
        return {
            mods: {},
            value: '1'
        };
    },
    onValueChanged(v) {
        this.state.value = v;
        this.state.mods = {};
        this.setState(this.state);
    },
    onModifier(m) {
        return (v) => {
            this.state.mods[m] = v;

            let value = +this.state.value;
            if (m == '1/3') {
                if (v) {
                    value /= 3.0;
                } else {
                    value *= 3.0;
                }
            } else if (m == '1/2') {
                if (v) {
                    value /= 2.0;
                } else {
                    value *= 2.0;
                }
            } else if (m == '3/2') {
                if (v) {
                    value *= 1.5;
                } else {
                    value /= 1.5;
                }
            }
            this.state.value = value.toFixed(1);
            this.setState(this.state);
        }
    },
    onSet() {
        this.props.onSet && this.props.onSet(+this.state.value);
    },
    onAdd() {
        this.props.onAdd && this.props.onAdd(+this.state.value);
    },
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex: 1, alignItems: 'center', marginTop:15}}>
                        <IconButton image={'equal'} height={32} width={32} resizeMode='stretch' onPress={this.onSet} />
                    </View>
                    <View style={{flex: 2, alignSelf: 'stretch', justifyContent: 'flex-start'}}>
                        <SpinNumeric value={this.state.value} min={0} max={100} onChanged={this.onValueChanged} />
                    </View>
                    <View style={{flex: 1, alignItems: 'center', marginTop: 15}}>
                        <IconButton image={'add'} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                    </View>
                </View>
                <View style={{flex: .75, flexDirection: 'row'}}>
                    {['1/3','1/2','3/2'].map((v, i) => {
                        return (
                            <View key={i} style={{flex: 1,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text>{v}</Text>
                                <Switch value={this.state.mods[v]} onValueChange={this.onModifier(v)} />
                            </View>
                        );
                    })}
                </View>
                <View style={{flex:1}}>
                    <QuickValuesView values={[4,6,9,12,16,18]} onChanged={this.onValueChanged}/>
                </View>
                <View style={{flex:4}}>
                    <FireAttackerValuesView />
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerAdvancedAddView;
