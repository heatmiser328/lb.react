'use strict'

var React = require('react-native');
var { View, Text, StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

var MoraleView = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render() {
    //console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>
          Some morale check stuff
        </Text>
      </View>
    );
  }
});

module.exports = MoraleView;
