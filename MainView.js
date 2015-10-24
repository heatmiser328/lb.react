'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View, Dimensions, ScrollView, Image, } = React;
var { ToolbarAndroid, } = React;
var TitleBar = require('./titleBar');
var DrawerLayout = require("./drawerLayout");
var NavMenu = require('./navMenu');

var logo = require('image!lb');
var title = 'La Bataille Assistant';

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

var MainView = React.createClass({
  getInitialState() {
    return {
        drawer: false
    }
  },
  menuHandler() {
      if (!this.state.drawer) {
          let open = this.refs.drawer.openDrawer || this.refs.drawer.open;
          open();
      } else {
          let close = this.refs.drawer.closeDrawer || this.refs.drawer.close;
          close();
      }
      this.state.drawer = !this.state.drawer;
  },
  menuItemHandler(e) {
    console.log('item selected');
  },
  render() {
    return (
      <View style={styles.container}>
        <DrawerLayout
          ref="drawer"
          onDrawerClosed={() => {this.state.drawer = false; console.log('closed');} }
          onDrawerOpened={() => {this.state.drawer = true; console.log('opened');} }
          onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
          onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
          drawerWidth={300}
          renderNavigationView={() => <NavMenu onSelected={this.menuItemHandler} /> }>
              <TitleBar logo={logo} title={title} onMenu={this.menuHandler}></TitleBar>
              <Image source={require('image!napolean')} style={styles.backgroundImage} />
        </DrawerLayout>
      </View>
    );
  }
});

module.exports = MainView;
