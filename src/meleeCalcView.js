'use strict'
var React = require('react');
import { View, Text, Switch } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var MultiSelectList = require('./widgets/multiSelectList');
var RadioButtonGroup = require('./widgets/radioButtonGroup');
var IconButton = require('./widgets/iconButton');
var Current = require('./services/current');

var MeleeCalcView = React.createClass({
    getInitialState() {
        return {
            incr: '8',
            loss: '0',
            melee: '12',
            lance: '0',
            total: '12',
            mods: {},
            side: this.props.side == 'attack' ? 0 : 1
        };
    },
    calcTotal() {
        let l = +this.state.lance;
        let m = +this.state.melee * (((+this.state.incr) - (+this.state.loss)) / (+this.state.incr));
        let mods = this.modifiers().filter((m) => this.state.mods[m.name]);
        m = mods.filter((m) => m.name.indexOf('Lance') < 0).reduce((p,c) => p *= c.mod, m);
        l = mods.filter((m) => m.name.indexOf('Lance') > -1).reduce((p,c) => p *= c.mod, l);
        m += l;
        this.state.total = m.toFixed(1);
        this.setState(this.state);
    },
    onIncrChanged(v) {
        //console.log('increment changed: ' + v);
        this.state.incr = v;
        this.calcTotal();
    },
    onLossChanged(v) {
        //console.log('loss changed: ' + v);
        this.state.loss = v;
        this.calcTotal();
    },
    onMeleeChanged(v) {
        //console.log('melee changed: ' + v);
        this.state.melee = v;
        this.calcTotal();
    },
    onLanceChanged(v) {
        //console.log('lance changed: ' + v);
        this.state.lance = v;
        this.calcTotal();
    },
    onTotalChanged(v) {
        //console.log('total changed: ' + v);
        this.setState({total: v});
    },
    onSideChanged(v) {
        this.setState({side:v, mods: {}});
    },
    onModChanged(m) {
        this.state.mods[m.name] = m.selected;
        this.calcTotal();
    },
    onAdd() {
        let side = this.state.side == 0 ? 'attack' : 'defend';
        this.props.onAdd && this.props.onAdd(side, this.state.total);
    },
    onSet() {
        let side = this.state.side == 0 ? 'attack' : 'defend';
        this.props.onSet && this.props.onSet(side, this.state.total);
    },
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', marginLeft: 20, marginRight: 20, borderRadius: 4, borderWidth: 2, borderColor: 'black', backgroundColor: 'whitesmoke'}}>
                <View style={{flex: 5, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text style={{fontSize: 16,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>{'Calculator'}</Text>                
                        <View style={{flex: 1, marginLeft: 5}}>
                            <SpinNumeric label={'Incr'} value={this.state.incr} min={1} integer={true} onChanged={this.onIncrChanged} />
                        </View>
                        <View style={{flex: 1, marginLeft: 5}}>
                            <SpinNumeric label={'Loss'} value={this.state.loss} min={0}  max={this.props.incr} integer={true} onChanged={this.onLossChanged} />
                        </View>
                        <View style={{flex: 1, marginLeft: 5}}>
                            <SpinNumeric label={'Melee'} value={this.state.melee} min={1} integer={true} onChanged={this.onMeleeChanged} />
                        </View>
                        <View style={{flex: 1, marginLeft: 5}}>
                            <SpinNumeric label={'Lance'} value={this.state.lance} min={0} integer={true} onChanged={this.onLanceChanged} />
                        </View>
                        <View style={{flex: 1, marginLeft: 5}}>
                            <SpinNumeric label={'Total'} value={this.state.total} min={1} onChanged={this.onTotalChanged} />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flex: 2, justifyContent:'center', alignItems: 'center'}}>
                                <RadioButtonGroup buttons={[{label: 'Attacker', value: 0}, {label: 'Defender', value: 1}]} state={this.state.side}
                                    onSelected={this.onSideChanged} />
                            </View>
                            <View style={{flex:.5, margin:2}}>
                                <IconButton image={'equal'} height={32} width={32} resizeMode='stretch' onPress={this.onSet} />
                            </View>
                            <View style={{flex:.5, margin:2}}>
                                <IconButton image={'add'} height={32} width={32} resizeMode='stretch' onPress={this.onAdd} />
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <MultiSelectList title={'Modifiers'}
                            items={this.modifiers().map((m) => {return {name: m.name, selected: this.state.mods[m.name]};})}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
            </View>
        );
    },
    modifiers() {
        let battle = Current.battle();
        if (!battle.hasOwnProperty('melee')) {
            // defaults
            return [
                {name: '1/3', mod: 0.333},
                {name: '1/2', mod: 0.5},
                {name: '3/2', mod: 1.5},
                {name: '2', mod: 2},
                {name: 'Lancers in Line', mod: 2}
            ];
        }
        if (this.state.side == 0) {
            return battle.melee.modifiers['attack'];
        }
        return battle.melee.modifiers['defend'];
    }
});

module.exports = MeleeCalcView;
