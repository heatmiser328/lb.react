/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {AppRegistry,} = React;

var lb = require('./app/views/mainView');

AppRegistry.registerComponent('lb', () => lb);
