import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

var QuickValuesView = React.createClass({
    onQuickValue(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v.toString());
        }
    },
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {
                this.props.values.map((v, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={this.onQuickValue(v)}
                            style={{flex:1, backgroundColor: 'lightgray', justifyContent:'center', alignItems: 'center',
                                height: this.props.height || 48,
                                marginLeft: i == 0 ? 5 : 0,
                                marginRight: 5,
                                borderColor: 'black', borderWidth: 1, borderRadius:5}}>
                                <Text style={{color: 'black', fontSize: 22, textAlign: 'center', alignSelf:'center'}}>{v.toString()}</Text>
                        </TouchableOpacity>
                    );
                })
            }
            </View>
        );
    }
});

module.exports = QuickValuesView;
