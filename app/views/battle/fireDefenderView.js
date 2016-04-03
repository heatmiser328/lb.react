'use strict'
var React = require('react-native');
var { View, Text } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');

var FireDefenderView = React.createClass({
    onQuickValue(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v);
        }
    },
    onIncrements(v) {
        return () => {
            this.props.onIncrementsChanged && this.props.onIncrementsChanged(v);
        }
    },

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={1} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        [4,6,9,12,14,16].map((v, i) => {
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
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Incr'} value={this.props.incr} min={1} onChanged={this.onIncrements} />
                </View>
            </View>
        );
    }
});

module.exports = FireDefenderView;
