'use strict';

var React = require('react-native');
var { StyleSheet, View, Navigator, Text, } = React;
var DrawerLayout = require("./drawerLayout");
var NavMenu = require('./navMenu');
var LandingView = require('./landingView');
var BattleView = require('./battle/battleView');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
});

var MainView = React.createClass({
  getInitialState() {
    return {
        drawer: false,
        scenario: {}
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
    //console.log('item selected');
    this.setState({scenario: e});
    this.toggleDrawer();
    this.refs.navigator.push({name: 'battle', index: 1});
  },
  render() {
    return (
      <View style={styles.container}>
        <DrawerLayout
          ref="drawer"
          onDrawerClosed={() => {this.state.drawer = false; /*console.log('closed');*/} }
          onDrawerOpened={() => {this.state.drawer = true; /*console.log('opened');*/} }
          onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
          onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
          drawerWidth={300}
          renderNavigationView={() => <NavMenu onSelected={this.menuItemHandler} /> }>

          <Navigator
            ref="navigator"
            initialRoute={{name: 'landing', index: 0}}
            renderScene={(route, navigator) => {
                //console.log(route);
                if (route.name == 'landing') {
                    return (
                      <LandingView onMenu={this.menuHandler}/>
                    );
                }
                //console.log(this.state);
                return (
                  <BattleView battle={this.state.scenario} onMenu={this.menuHandler}/>
                );
              }
            }
          />

        </DrawerLayout>
      </View>
    );
  }
});

module.exports = MainView;
