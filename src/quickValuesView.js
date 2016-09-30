'use strict'
var React = require('react');
import { View, TouchableOpacity, Text } from 'react-native';
//var Button = require('apsl-react-native-button');

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
                        <View key={i} style={{flex:1, backgroundColor: 'lightgray', alignItems: 'center',
                            height: this.props.height,
                            marginLeft: i == 0 ? 5 : 0,
                            marginRight: 5,
                            borderColor: 'black', borderWidth: 1, borderRadius:5}}>
                            <TouchableOpacity onPress={this.onQuickValue(v)}>
                                <Text style={{color: 'black', fontSize: 22, textAlign: 'center'}}>{v.toString()}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                    /*
                    return (
                        <Button key={i}
                            style={{
                                flex: 1,
                                width: 16,
                                height: 38,
                                padding: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: i == 0 ? 5 : 0,
                                marginTop: 10,
                                marginRight: 5,
                                //color: 'red',
                                backgroundColor: 'lightgray'
                                //backgroundColor: '#3F51B5'
                            }}
                            textStyle={{
                                color: 'black'
                            }}
                            onPress={this.onQuickValue(v)}
                        >
                            {v.toString()}
                        </Button>
                    );
                    */
                })
            }
            </View>
        );
    }
});

module.exports = QuickValuesView;
