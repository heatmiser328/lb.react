'use strict'
var React = require('react-native');
var { View, Text, Switch } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');
import Radio, {RadioButton} from 'react-native-simple-radio-button';

var MeleeCalcView = React.createClass({
    getInitialState() {
        return {
            incr: '8',
            loss: '0',
            melee: '12',
            lance: '0',
            total: '12',
            '1/3': false,
            '1/2': false,
            '3/2': false,
            '2': false,
            'Lance': false,
            side: this.props.side == 'attack' ? 0 : 1
        };
    },
    calcTotal() {
        let l = +this.state.lance;
        let m = +this.state.melee * (((+this.state.incr) - (+this.state.loss)) / (+this.state.incr));
        if (this.state['1/3']) {
            m /= 3;
        }
        if (this.state['1/2']) {
            m /= 2;
        }
        if (this.state['3/2']) {
            m *= 1.5;
        }
        if (this.state['2']) {
            m *= 2;
        }
        if (this.state['Lance']) {
            l *= 2;
        }
        m += l;
        this.setState({total: m.toFixed(1)});
    },
    onIncrChanged(v) {
        //console.log('increment changed: ' + v);
        this.setState({incr: v});
        this.calcTotal();
    },
    onLossChanged(v) {
        //console.log('loss changed: ' + v);
        this.setState({loss: v});
        this.calcTotal();
    },
    onMeleeChanged(v) {
        //console.log('melee changed: ' + v);
        this.setState({melee: v});
        this.calcTotal();
    },
    onLanceChanged(v) {
        //console.log('lance changed: ' + v);
        this.setState({lance: v});
        this.calcTotal();
    },
    onTotalChanged(v) {
        //console.log('total changed: ' + v);
        this.setState({total: v});
    },
    onModifier(m) {
        return (v) => {
            //console.log('modifier changed: ' + m + ' ' + v);
            let state = {};
            state[m] = v;
            this.setState(state);
            this.calcTotal();
        }
    },
    onAdd() {
        let side = this.state.side == 0 ? 'attack' : 'defend';
        this.props.onAdd && this.props.onAdd(side, this.state.total);
    },
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', paddingLeft: 75, paddingRight: 75, paddingBottom: 75, paddingTop: 25}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>{'Melee Calculator'}</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Incr'} value={this.state.incr} min={1} integer={true} onChanged={this.onIncrChanged} />
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Loss'} value={this.state.loss} min={0}  max={this.props.incr} integer={true} onChanged={this.onLossChanged} />
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Melee'} value={this.state.melee} min={1} integer={true} onChanged={this.onMeleeChanged} />
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Lance'} value={this.state.lance} min={0} integer={true} onChanged={this.onLanceChanged} />
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Total'} value={this.state.total} min={1} onChanged={this.onTotalChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        ['1/3','1/2','3/2','2','Lance'].map((v, i) => {
                            return (
                                <View key={i} style={{
                                    flex: 1,//i != 3 ? 1 : 2,
                                    alignItems: 'center',
                                    marginLeft: i == 0 ? 5 : 0,
                                    marginTop: 10,
                                    marginRight: i < 4 ? 5 : 10,
                                }}>
                                    <Text>{v}</Text>
                                    <Switch value={this.state[v]} onValueChange={this.onModifier(v)} />
                                </View>
                            );
                        })
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                    <Radio style={{marginLeft: 20}}
                      radio_props={[{label: 'Attacker', value: 0 }, {label: 'Defender', value: 1 }]}
                      initial={this.state.side}
                      formHorizontal={true}
                      labelHorizontal={true}
                      buttonColor={'#2196f3'}
                      animation={true}
                      onPress={(value) => {this.setState({side:value})}}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button style={{flex:1, marginRight: 10}} onPress={this.props.onClose}>{'Cancel'}</Button>
                    <Button style={{flex:1, marginRight: 10}} onPress={this.onAdd}>{'Add'}</Button>
                    <Button style={{flex:1}} onPress={this.props.onClose}>{'OK'}</Button>
                </View>
            </View>
        );
    }
});

module.exports = MeleeCalcView;
