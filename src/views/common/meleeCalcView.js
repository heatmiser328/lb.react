import React from 'react';
import { View, Text, Switch } from 'react-native';
import {SpinNumeric,MultiSelectList,RadioButtonGroup,IconButton} from 'react-native-nub';
import Icons from '../../res';
import Style from '../../services/style';

var MeleeCalcView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100,

            incr: '8',
            loss: '0',
            melee: '12',
            lance: '0',
            total: '12',
            mods: {},
            side: this.props.side == 'attack' ? 0 : 1
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
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
        let iconSize = (Math.min(this.state.height, this.state.width)) || 32;
        return (
            <View style={{flex:1, justifyContent: 'center', marginLeft: 1, marginRight: 1,
                        borderRadius: 4, borderWidth: 2, borderColor: 'black', backgroundColor: 'whitesmoke'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'silver'}}>
                    <View style={{flex: 2, justifyContent:'center', alignItems: 'center'}}>
                        <RadioButtonGroup buttons={[{label: 'Attacker', value: 0, fontSize: Style.Font.mediumlarge()}, 
                                                    {label: 'Defender', value: 1, fontSize: Style.Font.mediumlarge()}]} 
                            state={this.state.side}
                            onSelected={this.onSideChanged} />
                    </View>
                    <View style={{flex:.5, margin:2, alignItems: 'center'}} onLayout={this.onLayout}>
                        <IconButton image={Icons['equal']} height={iconSize} width={iconSize} resizeMode='stretch' onPress={this.onSet} />
                    </View>
                    <View style={{flex:.5, margin:2, alignItems: 'center'}}>
                        <IconButton image={Icons['add']} height={iconSize} width={iconSize} resizeMode='stretch' onPress={this.onAdd} />
                    </View>
                </View>                        
                <View style={{flex: 5, flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flex: 2, justifyContent: 'center'}}>                        
                        <View style={{flex:6}}>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <SpinNumeric label={'Incr'} labelFontSize={Style.Font.mediumlarge()} fontSize={Style.Font.large()} value={this.state.incr} min={1} integer={true} onChanged={this.onIncrChanged} />
                            </View>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <SpinNumeric label={'Loss'} labelFontSize={Style.Font.mediumlarge()} fontSize={Style.Font.large()} value={this.state.loss} min={0}  max={this.props.incr} integer={true} onChanged={this.onLossChanged} />
                            </View>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <SpinNumeric label={'Melee'} labelFontSize={Style.Font.mediumlarge()} fontSize={Style.Font.large()} value={this.state.melee} min={1} integer={true} onChanged={this.onMeleeChanged} />
                            </View>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <SpinNumeric label={'Lance'} labelFontSize={Style.Font.mediumlarge()} fontSize={Style.Font.large()} value={this.state.lance} min={0} integer={true} onChanged={this.onLanceChanged} />
                            </View>
                            <View style={{flex: 1, marginLeft: 5}}>
                                <SpinNumeric label={'Total'} labelFontSize={Style.Font.mediumlarge()} fontSize={Style.Font.large()} value={this.state.total} min={1} onChanged={this.onTotalChanged} />
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <MultiSelectList
                            itemFontSize={Style.Font.large()}
                            items={this.modifiers().map((m) => ({name: m.name, selected: this.state.mods[m.name]}))}
                            onChanged={this.onModChanged}/>
                    </View>
                </View>
            </View>
        );
    },
    rules() {
        if (this.props.battle.rules && this.props.battle.rules.hasOwnProperty('melee')) {
            return this.props.battle.rules.melee;
        }
    },
    modifiers() {  
        let rules = this.rules();      
        if (!rules) {
            // defaults
            return [
                {name: 'x1/3', mod: 0.333},
                {name: 'x1/2', mod: 0.5},
                {name: 'x3/2', mod: 1.5},
                {name: 'x2', mod: 2},
                {name: 'Lancers in Line', mod: 2}
            ];
        }
        if (this.state.side == 0) {
            return rules.modifiers['attack'];
        }
        return rules.modifiers['defend'];
    }    
});

module.exports = MeleeCalcView;