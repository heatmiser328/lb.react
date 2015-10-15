'use strict';

var React = require('react-native');
var { View, Text, Image, StyleSheet } = React;
var DrawerLayout = require("./DrawerLayout");

var MainView = React.createClass({

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
          <Image source={require('image!lb')} style={styles.backgroundImage}>
          </Image>
      </DrawerLayout>
    );
  }
});
/*
<View style={styles.container}>
</View>
<Text style={styles.welcome}>Drag this screen right, from the left edge.</Text>
*/
var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'blue',
  },
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'transparent',
  },
});

module.exports = MainView;
