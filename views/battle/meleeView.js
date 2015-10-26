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

var MeleeView = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render() {
    //console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>
          Some melee combat stuff
        </Text>
      </View>
    );
  }
});

module.exports = MeleeView;
