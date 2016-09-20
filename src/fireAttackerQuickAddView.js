'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var MultiSelectList = require('./widgets/multiSelectList');
var IconButton = require('./widgets/iconButton');
var Current = require('./services/current');

let modifiers = [
    'DG',
    'Range 2',
    'Range 3',
    'Square adjacent',
    'Square coincident'
];

var FireAttackerQuickAddView = React.createClass({
    getInitialState() {
        let battle = Current.battle();
        let nationalities = ['French', 'Russian'];
        let unittypes = [
            'Infantry',
            'Cavalry',
            'Artillery'
        ];

        let formations = [
            'Line',
            'Column',
            'Skirmish',
            'General',
            'Square',
            'Disorganized',
            'Routed'
        ];
        return {
            nationality: nationalities[0],
            unittype: unittypes[0],
            formation: formations[0],
            size: '4',
            mods: {},
            value: '0'
        };
    },
    onNationalityChanged(v) {
        // load unit types available for the nation
        this.state.nationality = v;
        this.calcValue();
    },
    onUnitTypeChanged(v) {
        // load formations available for the unit type
        this.state.unittype = v;
        this.calcValue();
    },
    onFormationChanged(v) {
        // set max size for the formation (or null if col/general/dg/route)
        this.state.formation = v;
        this.calcValue();
    },
    onSizeChanged(v) {        
        this.state.size = v;
        this.calcValue();
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
       this.calcValue();
    },
    onAdd() {
        this.props.onAdd && this.props.onAdd(+this.state.value);
    },
    calcValue() {
        // calc the fire value
        this.setState(this.state);
    },
    render() {
        let battle = Current.battle();
        let nationalities = ['French', 'Russian'];
        let unittypes = [
            'Infantry',
            'Cavalry',
            'Artillery'
        ];

        let formations = [
            'Line',
            'Column',
            'Skirmish',
            'General',
            'Square',
            'Disorganized',
            'Routed'
        ];
        return (
            <View style={{flex:1, marginTop: 55}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <SelectList title={'Nationality'} titleonly={true}
                        items={nationalities.map((n) => {return {label: n, value: n};})}
                        selected={this.state.nationality}
                        onChanged={this.onNationalityChanged}/>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <SelectList title={'Unit Type'} titleonly={true}
                        items={unittypes.map((t) => {return {label: t, value: t};})}
                        selected={this.state.unittype}
                        onChanged={this.onUnitTypeChanged}/>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <SelectList title={'Formation'} titleonly={true}
                        items={formations.map((f) => {return {label: f, value: f};})}
                        selected={this.state.formation}
                        onChanged={this.onFormationChanged}/>
                </View>
                <View style={{flex: 1, alignSelf: 'stretch'}}>
                    <Text style={{fontSize: 20, backgroundColor: 'silver', textAlign: 'center'}}>Size</Text>
                    <SpinNumeric value={this.state.size} min={0} max={30} onChanged={this.onSizeChanged} />
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <MultiSelectList title={'Modifiers'}
                        items={modifiers.map((m) => {return {name: m, selected: this.state.mods[m]};})}
                        onChanged={this.onModChanged}/>
                </View>
                <View style={{flex: 1, alignSelf: 'stretch'}}>
                    <Text style={{fontSize: 20, backgroundColor: 'silver', textAlign: 'center'}}>Value</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', backgroundColor: 'gray', textAlign: 'center'}}>
                        {this.state.value}
                    </Text>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <IconButton image={'add'} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerQuickAddView;
