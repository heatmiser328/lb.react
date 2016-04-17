'use strict'
var React = require('react-native');
var { View, Text } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');
var QuickValuesView = require('./quickValuesView');

var FireDefenderView = React.createClass({
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1}}>
                    <QuickValuesView values={[4,6,9,12,14,16]} onChanged={this.props.onChanged}/>
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Incr'} value={this.props.incr} min={1} onChanged={this.props.onIncrementsChanged} />
                </View>
            </View>
        );
    }
});

module.exports = FireDefenderView;
