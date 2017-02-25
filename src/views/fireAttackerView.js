import React from 'react';
import { View, Text, Switch } from 'react-native';
import {SpinNumeric,Font} from 'react-native-nub';
import QuickValuesView from './quickValuesView';


var FireAttackerView = React.createClass({
    getInitialState() {
        return {
            mods: {}
        };
    },
    onModifier(m) {
        return (v) => {
            this.state.mods[m] = v;

            let value = +this.props.value;
            if (m == '1/2') {
                if (v) {
                    value /= 2.0;
                } else {
                    value *= 2.0;
                }
            } else if (m == '3/2') {
                if (v) {
                    value *= 1.5;
                } else {
                    value /= 1.5;
                }
            } else if (m == '1/3') {
                if (v) {
                    value /= 3.0;
                } else {
                    value *= 3.0;
                }
            }
            this.props.onChanged && this.props.onChanged(value.toFixed(1));
        }
    },    
    render() {
        return (
            <View style={{flex:1, borderRightWidth: 1, borderRightColor: 'gray'}}>
                <Text style={{fontSize: Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>            
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {['1/3','1/2','3/2'].map((v, i) => {
                        return (
                            <View key={i} style={{
                                flex: 1,//i != 3 ? 1 : 2,
                                alignItems: 'center',
                                //marginLeft: i == 0 ? 5 : 0,
                                //marginTop: 10,
                                //marginRight: i < 3 ? 5 : 10,
                                //height: 32
                            }}>
                                <Text style={{fontSize: Font.medium()}}>{v}</Text>
                                <Switch value={this.state.mods[v]} onValueChange={this.onModifier(v)} />
                            </View>
                        );
                    })}
                </View>
                <View style={{flex:1}}>
                    <QuickValuesView values={[4,6,9,12,16,18]} onChanged={this.props.onChanged}/>                
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerView;
