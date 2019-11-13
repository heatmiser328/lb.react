import React from 'react';
import { View, Text, Image } from 'react-native';
import {SpinNumeric,MultiSelectList,RadioButtonGroup} from 'react-native-nub';
import {DiceRoll} from 'react-native-dice';
import QuickValuesView from '../common/quickValuesView';
import DiceModifiersView from '../common/diceModifiersView';
import Icons from '../../res';
import Morale from '../../services/morale';
import Base6 from '../../services/base6';
import Style from '../../services/style';

var ChargeCarreView = React.createClass({
    dice: [
        {num: 1, low: 1, high: 6, diecolor: 'red', dotcolor:'white'},
        {num: 1, low: 1, high: 6, diecolor: 'white', dotcolor:'black'}
    ],
    getInitialState() {
        let nationalities = this.nationalities();
        let formations = this.formations(nationalities[0]);
        return {
            nationality: nationalities[0],
            formation: formations[0],
            distance: '4',
            mods: {},
            die1: 1,
            die2: 1,
            results: '',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100            
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },            
    onNationalityChanged(v) {
        this.state.nationality = v;
        this.updateFormations();
        this.onResolve();
    },
    onFormationChanged(v) {
        this.state.formation = v;
        this.onResolve();
    },
    onDistanceChanged(v) {
        this.state.distance = v;
        this.onResolve();
    },
    onModChanged(m) {
       this.state.mods[m.name] = m.selected;
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
        let table = this.rules().table[this.state.nationality][this.state.formation][this.state.distance] || [];
        let mod = this.modifiers().filter((m) => this.state.mods[m.name]).reduce((p,c) => p + c.mod, 0);
        let dice = Base6.add((this.state.die1 * 10) + this.state.die2, mod);
        let result = table.find((t) => dice >= t.low && dice <= t.high) || {};
        this.state.results = result.result;
        this.setState(this.state);
    },
    render() {
        let iconsize = (Math.min(this.state.height, this.state.width) * 0.9) || 16;
        let table = this.rules().table[this.state.nationality][this.state.formation][this.state.distance] || [];
        return (
            <View style={{flex: 1}}>
                <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
                    <View style={{flex: 3, marginTop: 2, flexDirection: 'row'}}>
                        <View style={{flex:3, justifyContent: 'center', alignItems:'center'}} onLayout={this.onLayout}>
                            {/*<Text>{this.state.results}</Text>*/}
                            <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[this.state.results]} />
                        </View>
                        <View style={{flex:2}}>
                            <DiceRoll dice={this.dice} values={[this.state.die1,this.state.die2]}
                                onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                        </View>
                    </View>
                    <View style={{flex: 4}}>
                        <DiceModifiersView onChange={this.onDiceModifierChanged} />
                    </View>
                </View>
                <View style={{flex:3, flexDirection:'row'}}>
                    {/*morale*/}
                    <View style={{flex:4, justifyContent: 'flex-start', borderRightWidth: 1, borderRightColor: 'gray'}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Nationality'} labelFontSize={Style.Size.Label} direction={'vertical'}
                                    buttons={this.nationalities().map((n) => ({label:n,value:n, fontSize: Style.Size.ListItem}))}
                                    state={this.state.nationality}
                                    onSelected={this.onNationalityChanged}/>
                            </View>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Formation'} labelFontSize={Style.Size.Label} direction={'vertical'}
                                    buttons={this.formations(this.state.nationality).map((f) => ({label:f,value:f, fontSize: Style.Size.ListItem}))}
                                    state={this.state.formation}
                                    onSelected={this.onFormationChanged}/>
                            </View>
                            <View style={{flex:1}}>
                                <RadioButtonGroup title={'Distance'} labelFontSize={Style.Size.Label} direction={'vertical'}
                                    buttons={['4','3','2','1'].map((d) => ({label:d,value:d, fontSize: Style.Size.ListItem}))}
                                    state={this.state.distance}
                                    onSelected={this.onDistanceChanged}/>
                            </View>
                        </View>
                        <View style={{flex:2, justifyContent: 'flex-start'}}>
                            {table.map((x,i) => 
                                <View key={i} style={{flexDirection: 'row', justifyContent: 'flex-start', paddingTop:5}}>
                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                        <Image style={{height: iconsize, width: iconsize, resizeMode: 'stretch'}} source={Icons[x.result]} />
                                    </View>
                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.low}</Text>
                                    </View>
                                    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{fontSize: Style.Font.large(), fontWeight: 'bold', textAlign: 'center'}}>{x.high}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                    {/*modifiers*/}
                    <View style={{flex:2}}>
                        <MultiSelectList title={'Modifiers'}
                            labelFontSize={Style.Size.Label} 
                            itemFontSize={Style.Size.ListItem}                        
                            items={this.modifiers().map((m) => ({name: m.name, selected: this.state.mods[m.name]}))}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
            </View>
        );
    },
    rules() {
        return this.props.battle.rules.charge.carre;
    },
    nationalities() {        
        return Object.keys(this.rules().table);
    },
    formations(nationality) {        
        return Object.keys(this.rules().table[nationality]);
    },
    modifiers() {        
        return this.rules().modifiers;
    },
    updateFormations() {
        let formations = this.formations(this.state.nationality);
        if (formations.indexOf(this.state.formation) < 0) {
            this.state.formation = formations[0];
        }
    }
});

module.exports = ChargeCarreView;