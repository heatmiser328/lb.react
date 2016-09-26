'use strict'
var React = require('react');
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
var Current = require('./services/current');

let terrains = () => {
    let battle = Current.battle();
    return Object.keys(battle.fire.defense.terrain);
}
let formations = () => {
    let battle = Current.battle();
    return terrains().reduce((p,t) => {
        return p.concat(
            Object.keys(battle.fire.defense.terrain[t]).filter((f) => p.indexOf(f) < 0)
        );
    }, []);
}
let value = (terrain, formation) => {
    let battle = Current.battle();
    return battle.fire.defense.terrain[terrain][formation];
}

var TerrainView = React.createClass({
    onSelect(v) {
        return () => {
            if (v.label) {
                this.props.onSelect && this.props.onSelect(v.value);
            }
        }
    },
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                <View style={{flex:1.25}}>
                    <Text style={{fontSize: 14, fontStyle: 'italic'}}>{this.props.terrain}</Text>
                </View>
                {formations().map((f,i) => {
                    let v = value(this.props.terrain,f);
                    return (
                        <View key={i} style={{flex:1,alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.onSelect(v)}>
                                <Text style={{fontSize: 12,fontWeight:'bold'}}>{v.label}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        );
    }
});

var FormationsView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:1}}/>
                    {formations().map((f,i) =>
                        <View key={i} style={{flex:1, alignItems:'center'}}>
                            <Text style={{fontSize: 12}}>{f}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
});

var FireDefenderValuesView = React.createClass({
    render() {
        return (
            <View style={{flex:1, justifyContent: 'flex-start'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    <FormationsView />
                    {terrains().map((t,i) => <TerrainView key={i} terrain={t} onSelect={this.props.onSelect} /> )}
                </ScrollView>
            </View>
        );
    }
});

module.exports = FireDefenderValuesView;
