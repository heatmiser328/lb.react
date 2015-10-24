'use strict';

var React = require('react-native');
var { StyleSheet, View, } = React;
var DrawerLayout = require("./drawerLayout");
var NavMenu = require('./navMenu');
var LandingView = require('./landingView');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

var MainView = React.createClass({
  getInitialState() {
    return {
        drawer: false
    }
  },
  toggleDrawer() {
      if (!this.state.drawer) {
          let open = this.refs.drawer.openDrawer || this.refs.drawer.open;
          open();
      } else {
          let close = this.refs.drawer.closeDrawer || this.refs.drawer.close;
          close();
      }
      this.state.drawer = !this.state.drawer;
  },
  menuHandler() {
    this.toggleDrawer();
  },
  menuItemHandler(e) {
    console.log('item selected');
    this.toggleDrawer();
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
            <LandingView onMenu={this.menuHandler}/>
        </DrawerLayout>
      </View>
    );
  }
});

module.exports = MainView;
