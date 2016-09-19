'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var MultiSelectList = require('./widgets/multiSelectList');
var IconButton = require('./widgets/iconButton');
var Current = require('./services/current');

let modifiers = [
    'Arty w/Infantry',
    'Flank'
];

var FireDefenderQuickAddView = React.createClass({
    getInitialState() {
        let battle = Current.battle();
        return {
            nationality: battle.nationalities[0],
            terrain: terrains[0],
            formation: formations[0],
            density: '0',
            mods: {},
            value: '0'
        };
    },
    onNationalityChanged() {
        // load unit types available for the nation
        this.calcValue();
    },
    onTerrainChanged() {
        // load formations available for the terrain
        this.calcValue();
    },
    onFormationChanged() {
        this.calcValue();
    },
    onDensityChanged() {
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
    },
    render() {
        let defense = Current.battle().defense;
        let nationalites = [];
        let terrains = [];
        let formations = [];
        return (
            <View style={{flex:1}}>
                {/* The headers */}
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1}}><Text>Nationality</Text></View>
                    <View style={{flex:1}}><Text>Terrain</Text></View>
                    <View style={{flex:1}}><Text>Formation</Text></View>
                    <View style={{flex:1}}><Text>Density</Text></View>
                    <View style={{flex:1}}><Text>Modifiers</Text></View>
                    <View style={{flex:1}}><Text>Value</Text></View>
                    <View style={{flex:1}}></View>
                </View>

                {/* The fields */}
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex:1}}>
                        {/*[select list]*/}
                        <SelectList title={'Nationality'} titleonly={true}
                            items={nationalities.map((n) => {return {label: n, value: n};})}
                            selected={this.state.nationality}
                            onChanged={this.onNationalityChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        {/*[select list]*/}
                        <SelectList title={'Terrain'} titleonly={true}
                            items={terrains.map((t) => {return {label: t, value: t};})}
                            selected={this.state.unittype}
                            onChanged={this.onTerrainChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        {/*[select list]*/}
                        <SelectList title={'Formation'} titleonly={true}
                            items={formations.map((f) => {return {label: f, value: f};})}
                            selected={this.state.formation}
                            onChanged={this.onFormationChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        {/*[spin input]*/}
                        <SpinNumeric value={this.props.density} min={0} max={30} onChangeSize={this.props.onDensityChanged} />
                    </View>
                    <View style={{flex:1}}>
                        {/*[multi-select list]*/}
                        <MultiSelectList title={'Modifiers'}
                            items={modifiers.map((m) => {return {name: m, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        {/*[text]*/}
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', backgroundColor: 'gray'}}>{this.state.value}</Text>
                    </View>
                    <View style={{flex:1}}>
                        {/*[button]*/}
                        <IconButton image={'menu'} height={16} width={16} resizeMode='stretch' onPress={this.onAdd} />
                    </View>
                </View>
            </View>
        );
    }
});

module.exports = FireDefenderQuickAddView;
