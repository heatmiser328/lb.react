'use strict'
var React = require('react');
import { View, Text } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var SelectList = require('./widgets/selectList');
var Current = require('./services/current');

var FireDefenderAdvancedAddView = React.createClass({
    getInitialState() {
        let terrains = this.terrains();
        let formations = this.formations(terrains[0]);
        return {
            terrain: terrains[0],
            formation: formations[0]
        };
    },
    componentDidMount() {
        this.updateValue();
    },
    onTerrainChanged(v) {
        this.state.terrain = v || this.state.terrain;   // don't allow an uncheck
        let formations = this.formations(this.state.terrain);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
        this.updateValue();
        this.setState(this.state);
    },
    onFormationChanged(v) {
        this.state.formation = v || this.state.formation; // don't allow an uncheck
        this.updateValue();
        this.setState(this.state);
    },
    updateValue(state) {
        state = state || this.state;
        let battle = Current.battle();
        let value = battle.fire.defense.terrain[state.terrain][state.formation].value;
        this.props.onSet && this.props.onSet(value);
    },
    render() {
        return (
            <View style={{flex: 1}}>
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
        return Object.keys(battle.fire.defense.terrain[terrain]).filter((f) => battle.fire.defense.terrain[terrain][f].label != '');
    }
});

module.exports = FireDefenderAdvancedAddView;
