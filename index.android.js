/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {AppRegistry,} = React;
var { View, Text, Image, StyleSheet } = React;
var DrawerLayout = require("./DrawerLayout");

var lb = React.createClass({

  getInitialState() {
    return {};
  },

  render: function() {
    var navigationView = (
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        <Text>Hello there!</Text>
      </View>
    );
    return (
      <DrawerLayout
        onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Drag this screen right, from the left edge.</Text>
        </View>
      </DrawerLayout>
    );
  }
});
/*<Image source={require('image!lb')} style={styles.splash}/>*/
var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  splash: {
    width: 100,
    height: 100
  },
});


/*
var lb = require('./MainView');
*/
/*
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var lb = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/

AppRegistry.registerComponent('lb', () => lb);
