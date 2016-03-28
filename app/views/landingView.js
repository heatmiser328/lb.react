'use strict'

var React = require('react-native');
var { View, Text, Image, StyleSheet } = React;
var Icons = require('../../icons');
var TitleBar = require('./titleBar');
var title = 'La Bataille Assistant';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    //backgroundColor: 'rgba(0,0,0,0.01)',
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
    console.log('Landing');
    console.log(Icons.splash);
    let splash = require('../../resources/napolean.jpg');
    let logo = Icons.logo;
    //console.log(splash);
    return (
      //Icons.splash
      <View style={styles.container}>
        <TitleBar logo={logo} title={title} onMenu={this.menuHandler} />
        <Image source={Icons.splash} style={styles.backgroundImage} />        
      </View>
    );
  }
});

module.exports = LandingView;
