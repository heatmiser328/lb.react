'use strict'
var React = require('react');
import { View, Text, Switch } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var FireAttackerValuesView = require('./fireAttackerValuesView');
var IconButton = require('./widgets/iconButton');
var Current = require('./services/current');

var FireAttackerAdvancedAddView = React.createClass({
    getInitialState() {
        let unittypes = this.unittypes();
        let formations = this.formations(unittypes[0]);
        let size = this.size(unittypes[0], formations[0]);
        let state = {
            unittype: unittypes[0],
            formation: formations[0],
            size: size.density.toString(),
            factor: size.factor.toString(),
            mods: {},
            value: '1'
        };
        state.value = this.calcValue(state).toString();
        return state;
    },
    onSelection(size) {
        this.state.size = size.density.toString();
        this.state.factor = size.factor.toString();
        this.updateValue();
    },
    onUnitTypeChanged(v) {
        this.state.unittype = v || this.state.unittype;    // don't allow an uncheck
        this.updateFormations();
        this.updateSize();
        this.updateValue();
    },
    onFormationChanged(v) {
        this.state.formation = v || this.state.formation;   // don't allow an uncheck
        this.updateSize();
        this.updateValue();
    },
    onSizeChanged(v) {
        this.state.size = v;
        this.updateValue();
    },
    onFactorChanged(v) {
        this.state.factor = v;
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
                    <View style={{flex: 2, alignSelf: 'stretch', justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Size</Text>
                        <View>
                        <SpinNumeric value={this.state.size} min={0} max={30} onChanged={this.onSizeChanged} />
                        </View>
                    </View>
                    <View style={{flex: 2, alignSelf: 'stretch', justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>Factor</Text>
                        <View>
                        <SpinNumeric value={this.state.factor} min={0} max={30} onChanged={this.onFactorChanged} />
                        </View>
                    </View>
                    <View style={{flex: 1, alignSelf: 'stretch'}}>
                        <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>{' '}</Text>
                        <View style={{marginTop: 20}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', backgroundColor: 'gray', textAlign: 'center'}}>
                            {this.state.value}
                        </Text>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{margin:2}}>
                            <IconButton image={'equal'} height={32} width={32} resizeMode='stretch' onPress={this.onSet} />
                        </View>
                        <View style={{margin:2}}>
                            <IconButton image={'add'} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                        </View>
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
                <View style={{flex:3}}>
                    <FireAttackerValuesView onSelect={this.onSelection} />
                </View>

                {/*
                <View style={{flex:3, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:3}}>
                        <SelectList title={'Unit Type'} titleonly={true}
                            items={this.unittypes().map((t) => {return {label: t, value: t};})}
                            selected={this.state.unittype}
                            onChanged={this.onUnitTypeChanged}/>
                    </View>
                    <View style={{flex:2}}>
                        <SelectList title={'Formation'} titleonly={true}
                            items={this.formations(this.state.unittype).map((f) => {return {label: f, value: f};})}
                            selected={this.state.formation}
                            onChanged={this.onFormationChanged}/>
                    </View>
                </View>
                */}
            </View>
        );
    },
    nationalities() {
        let battle = Current.battle();
        return Object.keys(battle.fire.attack);
    },
    nationality(unittype) {
        //let battle = Current.battle();
        //return this.nationalities().find((n) => battle.fire.attack[n].hasOwnProperty(unittype));
        let idx = unittype.indexOf(':');
        return unittype.substring(0,idx);
    },
    unittypes() {
        let battle = Current.battle();
        return this.nationalities().reduce((p,c) => p.concat(Object.keys(battle.fire.attack[c]).map((t) => c+':'+t).filter((t) => p.indexOf(t) < 0)), []);
    },
    unittype(unittype) {
        let idx = unittype.indexOf(':');
        return unittype.substring(idx+1);
    },
    formations(unittype) {
        let battle = Current.battle();
        let nationality = this.nationality(unittype);
        let ut = this.unittype(unittype);
        return Object.keys(battle.fire.attack[nationality][ut]);
    },
    size(unittype, formation) {
        let battle = Current.battle();
        let nationality = this.nationality(unittype);
        let ut = this.unittype(unittype);
        return battle.fire.attack[nationality][ut][formation];
    },
    updateFormations() {
        let formations = this.formations(this.state.unittype);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
    },
    updateSize() {
        let size = this.size(this.state.unittype, this.state.formation);
        //if (size.density != +this.state.size) {
            this.state.size = size.density.toString();
            this.state.factor = size.factor.toString();
        //}
    }
});

module.exports = FireAttackerAdvancedAddView;
