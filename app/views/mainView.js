'use strict';

var React = require('react-native');
var { StyleSheet, View, Navigator, Text, } = React;
var DrawerLayout = require("./drawerLayout");
var NavMenu = require('./navMenu');
var LandingView = require('./landingView');
var BattleView = require('./battle/battleView');
var Battles = require('../core/battles');
var Current = require('../core/current');

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
        scenario: null,
        current: false,
    }
  },
  componentWillMount() {
      this.fetchData();
  },
  fetchData() {
      console.log('mainView: load current game');
      //Current.remove()
      //.then(() => {
      Current.load()
      .then((data) => {
        if (data) {
          let scenario = Battles.scenario(data.scenario);
          if (scenario) {
            this.setState({
              scenario: scenario,
              current: true
            });
            //this.refs.navigator.push({name: 'battle', index: 1});
          }
        } else {
          console.log('mainView: no current game');
        }
      })
      //})
      .done();
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
    console.log(e);
    Current.reset(e)
    .then(() => {
        this.toggleDrawer();
        let scenario = Battles.scenario(e.scenario.id);
        if (scenario) {
            this.setState({current: true, scenario: scenario});
            this.refs.navigator.push({name: 'battle', index: 1});
        }
    })
    .done();
  },
  initialRoute() {
    if (!this.state.current) {
      return {name: 'landing', index: 0};
    }
    return {name: 'battle', index: 1};
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
            initialRoute={this.initialRoute()}
            renderScene={(route, navigator) => {
                //console.log(route.name);
                if (!this.state.current) {
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
