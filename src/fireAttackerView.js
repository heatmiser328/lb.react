'use strict'
var React = require('react');
import { View, Text, Switch } from 'react-native';
var Button = require('apsl-react-native-button');
var SpinNumeric = require('./widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
var FireAttackerQuickAddView = require('./fireAttackerQuickAddView');
var Current = require('./services/current');

var FireAttackerView = React.createClass({
    onModifier(m) {
        return (v) => {
            this.props.onModifierChanged && this.props.onModifierChanged(m, v);
        }
    },
    render() {
        //(this.props.mods[i] ? (i < 3 ? 'x ' : '> ') : '') + v
        return (
            <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        ['1/3','1/2','3/2','Cannister'].map((v, i) => {
                            return (
                                <View key={i} style={{
                                    flex: 1,//i != 3 ? 1 : 2,
                                    alignItems: 'center',
                                    marginLeft: i == 0 ? 5 : 0,
                                    marginTop: 10,
                                    marginRight: i < 3 ? 5 : 10,
                                    height: 32
                                }}>
                                    <Text>{v}</Text>
                                    <Switch value={this.props.mods[i]} onValueChange={this.onModifier(v)} />
                                </View>
                            );
                        })
                    }
                </View>
                {this.renderValues()}
            </View>
        );
    },
    renderValues() {
        let battle = Current.battle();
        if (battle.hasOwnProperty('attack')) {
            return (
                <View style={{flex: 4}}>
                    <FireAttackerQuickAddView events={this.props.events} onSet={this.props.onChanged} onAdd={this.props.onAdd} />
                </View>
            );
        }

        return (
            <View style={{flex: 1}}>
                <QuickValuesView values={[4,6,9,12,16,18]} onChanged={this.props.onChanged}/>
            </View>
        );
    }
});

module.exports = FireAttackerView;
