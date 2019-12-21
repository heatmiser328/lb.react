import React from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import Style from '../../services/style';
import Icons from '../../res';

var NationalityView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <Image source={Icons[this.props.nationality]} opacity={0.20} style={{flex: 1, width:null, height:null}} resizeMode='stretch'>
                    <View style={{flex: 1}}>
                        {this.props.units.map((unit,i) => {
                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.medium(), fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>{unit.unittype}</Text>
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize: Style.Scaling.fontScale(14), fontWeight: 'bold', textAlign: 'center'}}>{unit.condition}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </Image>
            </View>
        );
    }
});

var FireDefenderMoraleView = React.createClass({
    render() {
        /*
        [National flag

        [Unit]   [condition]

        ]
        */
        return (
            <View style={{flex:1, justifyContent: 'flex-start'}}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>{' '}</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>Condition</Text>
                    </View>
                </View>
                <View style={{flex:10}}>
                    <ScrollView                    
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.nationalities().map((n,i) => <NationalityView key={i} nationality={n} units={this.units(n)} /> )}
                    </ScrollView>                
                </View>
            </View>
        );
    },
    nationalities() {        
        return Object.keys(this.props.battle.rules.morale.fire);
    },
    unittypes(nationality) {    
        return Object.keys(this.props.battle.rules.morale.fire[nationality]);
    },
    units(nationality) {
        var l = [];
        this.unittypes(nationality).forEach((u) => {
            let o = {
                nationality: nationality,
                unittype: u,
                condition: this.props.battle.rules.morale.fire[nationality][u]
            };
            l.push(o);
        });
        return l;
    },
});

module.exports = FireDefenderMoraleView;