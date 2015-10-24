'use strict'

var React = require('react-native');
var { View, Image, StyleSheet } = React;
var TitleBar = require('./titleBar');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'transparent',
  },
});

var LandingView = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  menuHandler() {
    this.props.onMenu && this.props.onMenu();
  },
  render() {
    return (
      <View style={styles.container}>
        <TitleBar onMenu={this.menuHandler} />
        <Image source={require('image!napolean')} style={styles.backgroundImage} />
      </View>
    );
  }
});

module.exports = LandingView;
