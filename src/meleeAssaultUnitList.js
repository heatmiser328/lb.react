'use strict';

var React = require('react');
import { View, Text, Image, ScrollView } from 'react-native';
var SpinNumeric = require('./widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');
var Base6 = require('./services/base6');
var Icons = require('./res/icons');

var MeleeAssaultUnitList = React.createClass({
    onChanged(i) {
        return (v) => {
            this.props.onChanged && this.props.onChanged(i, v);
        }
    },
    render() {
        return (
            <View style={{flex: 1, alignSelf: 'stretch'}}>
                <Text style={{fontSize: 16, backgroundColor: 'silver', textAlign: 'center'}}>{this.props.title}</Text>
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {this.props.items.map((item,i) => {
                        let icon = (item.result ? Icons['pass'] : Icons['fail']);
                        return (
                            <View key={i} style={{flex:1}}>
                                <View style={{flex:1, flexDirection: 'row'}}>
                                    <SpinNumeric value={item.value} values={Base6.values} integer={true} onChanged={this.onChanged(i)} />
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <Image style={{height: 32, width: 32, resizeMode: 'stretch'}} source={icon} />
                                    </View>
                                </View>
                                <View style={{flex: 1}}>
                                    <QuickValuesView values={[16,26,36,46,56]} onChanged={this.onChanged(i)}/>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
});

module.exports = MeleeAssaultUnitList;
