'use strict'
var React = require('react');
import { View, Text } from 'react-native';
import {SpinNumeric,SelectList,MultiSelectList,IconButton} from 'react-native-app-nub';
var Icons = require('./res/icons');
var Current = require('./services/current');

let modifiers = [
    'Arty w/Infantry',
    'Flank'
];

var FireDefenderQuickAddView = React.createClass({
    getInitialState() {
        let terrains = this.terrains();
        let formations = this.formations(terrains[0]);
        let state = {
            terrain: terrains[0],
            formation: formations[0],
            mods: {},
            value: '0'
        };
        state.value = this.calcValue(state).toString();
        return state;
    },
    onTerrainChanged(v) {
        this.state.terrain = v;
        let formations = this.formations(this.state.terrain);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
        this.updateValue();
    },
    onFormationChanged(v) {
        this.state.formation = v;
        this.updateValue();
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
       this.updateValue();
    },
    onSet() {
        this.props.onSet && this.props.onSet(+this.state.value);
    },
    onAdd() {
        this.props.onAdd && this.props.onAdd(+this.state.value);
    },
    updateValue() {
        this.state.value = this.calcValue().toString();
        this.setState(this.state);
    },
    calcValue(state) {
        // calc the defense value
        state = state || this.state;
        // the base defense value for the terrain/formation
        let battle = Current.battle();
        let value = battle.fire.defense.terrain[state.terrain][state.formation];
        if (state.mods['Arty w/Infantry'] && state.formation != 'Carre') {
            value -= 2;
        }
        if (state.mods['Flank']) {
            value = 6;
        }
        return value;
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex: 4, alignSelf: 'stretch'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Defense</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', backgroundColor: 'gray', textAlign: 'center'}}>
                            {this.state.value}
                        </Text>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{margin:2}}>
                            <IconButton image={Icons['equal']} height={32} width={32} resizeMode='stretch' onPress={this.onSet} />
                        </View>
                        <View style={{margin:2}}>
                            <IconButton image={Icons['add']} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                        </View>
                    </View>
                </View>
                <View style={{flex:2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:1}}>
                        <SelectList title={'Terrain'} titleonly={true}
                            items={this.terrains().map((t) => {return {label: t, value: t};})}
                            selected={this.state.terrain}
                            onChanged={this.onTerrainChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <SelectList title={'Formation'} titleonly={true}
                            items={this.formations(this.state.terrain).map((f) => {return {label: f, value: f};})}
                            selected={this.state.formation}
                            onChanged={this.onFormationChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <MultiSelectList title={'Modifiers'}
                            items={modifiers.map((m) => {return {name: m, selected: this.state.mods[m]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
                {/*View style={{flex: 6}} />*/}
            </View>
        );
    },
    terrains() {
        let battle = Current.battle();
        return Object.keys(battle.fire.defense.terrain);
    },
    formations(terrain) {
        let battle = Current.battle();
        return Object.keys(battle.fire.defense.terrain[terrain]);
    }
});

module.exports = FireDefenderQuickAddView;
