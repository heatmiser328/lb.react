'use strict';

var React = require('react-native');
var { View, Text, TouchableOpacity } = React;
var battles = require('../../core/battles.js');
var moment = require('moment');

var ScenarioItem = React.createClass({
  onPress() {
    //console.log(this.props);
    let scenario = battles.scenario(this.props.scenarioid);
    this.props.onSelected && this.props.onSelected(scenario);
  },
  render() {
    let startdt = moment(this.props.start);
    let enddt = moment(this.props.end);
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flex: 1,
          flexDirection: 'column',
          margin: 5,
          //padding: 1,
          backgroundColor: '#eaeaea',
          borderRadius: 3,
        }}>
          <Text style={{fontSize: 16,textAlign: 'left',marginLeft: 10,marginTop: 2}}>{this.props.name}</Text>
          <Text style={{fontSize: 12,textAlign: 'left',marginLeft: 10,marginTop: 2}}>
            {startdt.format("MMM DD, YYYY HH:mm")}{' - '}{enddt.format("HH:mm")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

module.exports = ScenarioItem;
