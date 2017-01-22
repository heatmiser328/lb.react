import React from 'react';
import { View, Text } from 'react-native';
import {SpinNumeric,RadioButtonGroup} from 'react-native-nub';

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
        let value = this.props.rules.defense.terrain[state.terrain][state.formation].value;
        this.props.onSet && this.props.onSet(value);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex:2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:4}}>
                        <RadioButtonGroup title={'Terrain'} direction={'vertical'}
                            buttons={this.terrains().map((t) => {return {label:t,value:t};})}
                            state={this.state.terrain}
                            onSelected={this.onTerrainChanged}/>
                    </View>
                    <View style={{flex:3}}>
                        <RadioButtonGroup title={'Formation'} direction={'vertical'}
                            buttons={this.formations(this.state.terrain).map((f) => {return {label:f,value:f};})}
                            state={this.state.formation}
                            onSelected={this.onFormationChanged}/>
                    </View>
                </View>
                {/*View style={{flex: 6}} />*/}
            </View>
        );
    },
    terrains() {        
        return Object.keys(this.props.rules.defense.terrain);
    },
    formations(terrain) {        
        let t = this.props.rules.defense.terrain[terrain];
        if (t) {
            return Object.keys(t).filter((f) => this.props.rules.defense.terrain[terrain][f].label != '');
        }
        return [];
    }
});

module.exports = FireDefenderAdvancedAddView;
