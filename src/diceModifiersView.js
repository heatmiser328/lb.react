'use strict'
var React = require('react');
import { View } from 'react-native';
var Button = require('apsl-react-native-button');

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
                        <Button key={i}
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
                                backgroundColor: 'blue'
                                //backgroundColor: '#3F51B5'
                            }}
                            textStyle={{
                                color: 'white'
                            }}
                            onPress={this.onModifier(v)}
                        >
                            {v}
                        </Button>
                    )
                })
            }
            </View>
        );
    }
});

module.exports = DiceModifiersView;
