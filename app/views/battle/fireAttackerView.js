'use strict'
var React = require('react-native');
var { View, Text, Switch } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');

var FireAttackerView = React.createClass({
    onQuickValue(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v);
        }
    },
    onModifier(m) {
        return (v) => {
            this.props.onModifierChanged && this.props.onModifierChanged(m, v);
        }
    },
    render() {
        //(this.props.mods[i] ? (i < 3 ? 'x ' : '> ') : '') + v
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={1} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        [4,6,9,12,16,18].map((v, i) => {
                            return (
                                <Button key={i}
                                    style={{
                                        flex: 1,
                                        width: 16,
                                        height: 32,
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
                        })
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        ['1/3','1/2','3/2','Cannister'].map((v, i) => {
                            return (
                                <View key={i} style={{
                                    flex: 1,//i != 3 ? 1 : 2,
                                    alignItems: 'center',
                                    marginLeft: i == 0 ? 5 : 0,
                                    marginTop: 10,
                                    marginRight: i < 3 ? 5 : 10,
                                }}>
                                    <Text>{v}</Text>
                                    <Switch value={this.props.mods[i]} onValueChange={this.onModifier(v)} />
                                </View>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
});

module.exports = FireAttackerView;
