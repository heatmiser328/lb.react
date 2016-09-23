'use strict'
var React = require('react');
import { View, Text } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
var SpinNumeric = require('./widgets/spinNumeric');
var MultiSelectList = require('./widgets/multiSelectList');
var SelectList = require('./widgets/selectList');
var QuickValuesView = require('./quickValuesView');
var DiceModifiersView = require('./diceModifiersView');
var DiceRoll = require('./widgets/diceRoll');
var Morale = require('./services/morale');
var Base6 = require('./services/base6');

let standmodifiers = [
    {name: 'Assaulted in flank', type: 'defend', attmod: 12, defmod: -12},
    {name: 'Assaulted in rear', type: 'defend', attmod: 6, defmod: -6},
    {name: 'In skirmish order', type: 'defend', attmod: 99, defmod: -6},
    {name: 'In Line', type: 'defend', attmod: 0, defmod: -3},
    {name: 'In Carre', type: 'defend', attmod: 0, defmod: 6},
    {name: 'Disordered', type: 'defend', attmod: 3, defmod: -3},
    {name: 'Routed', type: 'defend', attmod: 6, defmod: -6},
    {name: 'Assaulting up a slope', type: 'attack', attmod: -3, defmod: 3},
    {name: 'Assaulting across a stream', type: 'attack', attmod: -3, defmod: 3},
    {name: 'Casualty due to defensive fire', type: 'attack', attmod: -3, defmod: 0}
];

let carremodifiers = standmodifiers;


var MeleeChargeView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, color: 'red'},
        {num: 1, low: 1, high: 6, color: 'white'}
    ],
    getInitialState() {
        return {
            mode: 0,
            standmorale: '11',
            standleader: '0',
            standmods: {},
            carrenationality: '',
            carreformation: '',
            carredistance: '4',
            carremods: {},
            die1: 1,
            die2: 1,
            results: ''
        };
    },
    onModeChanged(v) {
        this.state.mode = v;
        this.onResolve();
    },
    onStandMoraleChanged(v) {
        this.state.standmorale = v;
        this.onResolve();
    },
    onStandLeaderChanged(v) {
        this.state.standleader = v;
        this.onResolve();
    },
    onStandModChanged(m) {
       this.state.standmods[m.name] = m.selected;
       this.onResolve();
    },
    onCarreNationalityChanged(v) {
        this.state.carrenationality = v;
        this.updateFormations();
        this.onResolve();
    },
    onCarreFormationChanged(v) {
        this.state.carreformation = v;
        this.onResolve();
    },
    onCarreDistanceChanged(v) {
        this.state.carredistance = v;
        this.onResolve();
    },
    onCarreModChanged(m) {
       this.state.carremods[m.name] = m.selected;
       this.onResolve();
    },
    onDiceModifierChanged(v) {
        let d = Base6.add((this.state.die1 * 10) + this.state.die2, +v);
        this.state.die1 = Math.floor(d / 10);
        this.state.die2 = d % 10;
        this.onResolve();
    },
    onDieChanged(d,v) {
        this.state['die'+d] = v;
        this.onResolve();
    },
    onDiceRoll(d) {
        this.state.die1 = d[0].value;
        this.state.die2 = d[1].value;
        this.onResolve();
    },
    onResolve() {
        this.setState(this.state);
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: .25, justifyContent:'center', alignItems: 'center'}}>
                    <RadioForm
                      style={{alignSelf: 'center'}}
                      radio_props={[{label: 'Stand', value: 0 }, {label: 'Form Square', value: 1 }]}
                      initial={this.state.mode}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      animation={true}
                      onPress={this.onModeChanged}
                    />
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* stand */}
                    <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                        <View style={{flex:1}}>
                            <SpinNumeric label={'Morale'} value={this.state.standmorale} values={Base6.values} integer={true} onChanged={this.onStandMoraleChanged} />
                        </View>
                        <View style={{flex: 1}}>
                            <QuickValuesView values={[16,26,36,46,56]} onChanged={this.onStandMoraleChanged}/>
                        </View>
                        <View style={{flex:1}}>
                            <SpinNumeric label={'Leader'} value={this.state.standleader} min={0} max={36} integer={true} onChanged={this.onStandLeaderChanged} />
                        </View>
                        <View style={{flex:2}}>
                            <MultiSelectList title={'Modifiers'}
                                items={standmodifiers.map((m) => {return {name: m.name, selected: this.state.standmods[m.name]};})}
                                onChanged={this.onStandModChanged}/>
                        </View>
                    </View>
                    {/* square */}
                    <View style={{flex:1}}>
                        <View style={{flex:1}}>
                            <SelectList title={'Nationality'} titleonly={true}
                                items={this.nationalities().map((n) => {return {label: n, value: n};})}
                                selected={this.state.carrenationality}
                                onChanged={this.onCarreNationalityChanged}/>
                        </View>
                        <View style={{flex:1}}>
                            <SelectList title={'Formation'} titleonly={true}
                                items={this.formations(this.state.nationality).map((f) => {return {label: f, value: f};})}
                                selected={this.state.carreformation}
                                onChanged={this.onCarreFormationChanged}/>
                        </View>
                        <View style={{flex:1}}>
                            <SpinNumeric label={'Distance'} value={this.state.carredistance} min={1} max={4} integer={true} onChanged={this.onCarreDistanceChanged} />
                        </View>
                        <View style={{flex:2}}>
                            <MultiSelectList title={'Modifiers'}
                                items={carremodifiers.filter((m) => m.type == 'defend').map((m) => {return {name: m.name, selected: this.state.carremods[m.name]};})}
                                onChanged={this.onCarreModChanged}/>
                        </View>
                    </View>
                </View>

                <View style={{flex: .75, flexDirection: 'row', backgroundColor: 'whitesmoke'}}>
                    <View style={{flex:1}}>
                        {/* images for stand,square,disorder,route??*/}
                        <Text>{this.state.results}</Text>
                    </View>
                    <View style={{flex:3}}>
                        <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: 'whitesmoke'}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    },
    nationalities() {
        //let battle = Current.battle();
        //return Object.keys(battle.attack.armies);
        return ['French','Russian'];
    },
    formations(nationality) {
        //let battle = Current.battle();
        //return Object.keys(battle.attack.armies[nationality].units[unittype]);
        return ['Column','Line'];
    },
    updateFormations() {
        let formations = this.formations(this.state.carrenationality);
        if (formations.indexOf(this.state.carreformation) < 0) {
            this.state.carreformation = formations[0];
        }
    }
});

module.exports = MeleeChargeView;
