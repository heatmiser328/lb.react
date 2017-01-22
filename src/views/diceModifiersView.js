import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';

var DiceModifiersView = React.createClass({
    onModifier(v) {
        return () => {
            this.props.onChange && this.props.onChange(+v);
        }
    },
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {
                ['-6','-3','-1','+1','+3','+6'].map((v, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={this.onModifier(v)}
                            style={{
                                flex: 1,
                                //width: 16,
                                height: 54,
                                padding: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: i == 0 ? 5 : 0,
                                marginTop: 10,
                                marginRight: 5,
                                backgroundColor: 'blue',
                                //backgroundColor: '#3F51B5'
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius:5
                            }}>
                            <Text style={{color: 'white', fontSize: 22, textAlign: 'center', alignSelf:'center'}}>{v}</Text>
                        </TouchableOpacity>
                    )
                })
            }
            </View>
        );
    }
});

module.exports = DiceModifiersView;
