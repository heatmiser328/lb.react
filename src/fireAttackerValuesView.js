'use strict'
var React = require('react');
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
var Current = require('./services/current');

let nationalities = () => {
    let battle = Current.battle();
    return Object.keys(battle.fire.attack);
}
let unittypes = (nationality) => {
    let battle = Current.battle();
    return Object.keys(battle.fire.attack[nationality]);
}
let formations = (nationality) => {
    let battle = Current.battle();
    return unittypes(nationality).reduce((p,unittype) => {
        return p.concat(
            Object.keys(battle.fire.attack[nationality][unittype]).filter((f) => p.indexOf(f) < 0)
        );
    }, []);
}
let value = (nationality, unittype, formation) => {
    let battle = Current.battle();
    //console.log('>>>> '+nationality+'/'+unittype+'/'+formation);
    return battle.fire.attack[nationality][unittype][formation];
}

var FormationView = React.createClass({
    onSelect(v) {
        return () => {
            if (v.hasOwnProperty('label')) {
                this.props.onSelect && this.props.onSelect(v);
            }
        }
    },
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 14, fontStyle: 'italic'}}>{this.props.formation}</Text>
                </View>
                {unittypes(this.props.nationality).map((ut,i) => {
                    let v = value(this.props.nationality,ut,this.props.formation) || {};
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

var NationalityView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{this.props.nationality}</Text>
                    </View>
                    {unittypes(this.props.nationality).map((ut,i) =>
                        <View key={i} style={{flex:1, alignItems:'center'}}>
                            <Text style={{fontSize: 12}}>{ut}</Text>
                        </View>
                    )}
                </View>
                {formations(this.props.nationality).map((f,i) =>
                    <FormationView key={i} nationality={this.props.nationality} formation={f} onSelect={this.props.onSelect} />
                )}
                <View style={{flex:1}} />
            </View>
        );
    }
});

var FireAttackerValuesView = React.createClass({
    render() {
        return (
            <View style={{flex:1, justifyContent: 'flex-start'}}>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {nationalities().map((n,i) => <NationalityView key={i} nationality={n} onSelect={this.props.onSelect}/> )}
                </ScrollView>
            </View>
        );
    }
});

module.exports = FireAttackerValuesView;
