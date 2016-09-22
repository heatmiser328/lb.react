'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var MultiSelectList = require('./widgets/multiSelectList');
var IconButton = require('./widgets/iconButton');
var Current = require('./services/current');

let modifiers = [
    'Disorder',
    'Range 2',
    'Range 3',
    'Square adjacent'
    //,'Square coincident'
];

var FireAttackerQuickAddView = React.createClass({
    getInitialState() {
        let unittypes = this.unittypes();
        let formations = this.formations(unittypes[0]);
        let sizes = this.sizes(unittypes[0], formations[0]);
        let state = {
            unittype: unittypes[0],
            formation: formations[0],
            size: sizes[0].density.toString(),
            mods: {},
            value: '0'
        };
        state.value = this.calcValue(state).toString();
        return state;
    },
    onUnitTypeChanged(v) {
        // load formations available for the unit type
        this.state.unittype = v;
        this.updateFormations();
        this.updateSizes();
        this.updateValue();
    },
    onFormationChanged(v) {
        // set max size for the formation (or null if col/general/dg/route)
        this.state.formation = v;
        this.updateSizes();
        this.updateValue();
    },
    onSizeChanged(v) {
        this.state.size = v;
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
        state = state || this.state;

        //value = size * fire multiplier * modifiers
        let sizes = this.sizes(state.unittype, state.formation);
        let factor = sizes && sizes.length > 0 ? sizes[0].factor : 1;
        let value = +state.size * factor;
        if (state.mods['Disorder']) {
            value *= 0.5;
        }
        if (state.mods['Range 2']) {
            value /= 2.0;
        }
        if (state.mods['Square adjacent']) {
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
                    <View style={{flex: 1, alignSelf: 'stretch'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Attack</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', backgroundColor: 'gray', textAlign: 'center'}}>
                            {this.state.value}
                        </Text>
                    </View>
                    <View style={{flex:.5}}>
                        <View style={{margin:2}}>
                            <IconButton image={'equal'} height={32} width={32} resizeMode='stretch' onPress={this.onSet} />
                        </View>
                        <View style={{margin:2}}>
                            <IconButton image={'add'} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                        </View>
                    </View>
                </View>

                <View style={{flex:2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:1}}>
                        <SelectList title={'Unit Type'} titleonly={true}
                            items={this.unittypes().map((t) => {return {label: t, value: t};})}
                            selected={this.state.unittype}
                            onChanged={this.onUnitTypeChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <SelectList title={'Formation'} titleonly={true}
                            items={this.formations(this.state.unittype).map((f) => {return {label: f, value: f};})}
                            selected={this.state.formation}
                            onChanged={this.onFormationChanged}/>
                    </View>
                    <View style={{flex:1}}>
                        <MultiSelectList title={'Modifiers'}
                            items={modifiers.map((m) => {return {name: m, selected: this.state.mods[m]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
            </View>
        );
    },
    nationality(battle,unittype) {
        return Object.keys(battle.attack.armies).find((n) => battle.attack.armies[n].units.hasOwnProperty(unittype));
    },
    unittypes() {
        let battle = Current.battle();
        let ut = Object.keys(battle.attack.armies).reduce((a,b) =>
            a.concat(
                Object.keys(battle.attack.armies[b].units).filter((item) => !a.includes(item))
            ), []);
        return ut;
    },
    formations(unittype) {
        let battle = Current.battle();
        let nationality = this.nationality(battle,unittype);
        return Object.keys(battle.attack.armies[nationality].units[unittype]);
    },
    sizes(unittype, formation) {
        let battle = Current.battle();
        let nationality = this.nationality(battle,unittype);
        return battle.attack.armies[nationality].units[unittype][formation];
    },
    updateFormations() {
        let formations = this.formations(this.state.unittype);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
    },
    updateSizes() {
        let sizes = this.sizes(this.state.unittype, this.state.formation);
        let size = sizes.find((s) => s.density == +this.state.size);
        if (!size) {
            this.state.size = sizes[0].density.toString();
        }
    }
});

module.exports = FireAttackerQuickAddView;
