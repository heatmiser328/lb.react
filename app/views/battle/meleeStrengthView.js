'use strict'
var React = require('react-native');
var { View, Text } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');

var MeleeStrengthView = React.createClass({
    onReset() {
        this.props.onChanged && this.props.onChanged('0');
    },
    render() {
        return (
              <View style={{flex:1}}>
                  <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>{this.props.label}</Text>
                  <View style={{flex: 1}}>
                      <SpinNumeric value={this.props.value} min={0} onChanged={this.props.onChanged} />
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                      <Button style={{flex:2, marginLeft:15,backgroundColor: 'blue'}} textStyle={{color: 'white'}} onPress={this.props.onAdd}>
                          {'Add'}
                      </Button>
                      <Text style={{flex:.25}}></Text>
                      <Button style={{flex:2, marginRight:15,backgroundColor: 'blue'}} textStyle={{color: 'white'}} onPress={this.onReset}>
                          {'Reset'}
                      </Button>
                  </View>
              </View>
        );
    }
});

module.exports = MeleeStrengthView;
