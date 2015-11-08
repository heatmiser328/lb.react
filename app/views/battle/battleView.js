'use strict'

var React = require('react-native');
var { View, Dimensions, StyleSheet, } = React;
var icons = require('../icons');
var TitleBar = require('../titleBar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var deviceWidth = Dimensions.get('window').width;
var ScrollingTabBar = require('../scrollingTabBar');
var TurnView = require('./turnView');
var FireView = require('./fireView');
var MeleeView = require('./meleeView');
var MoraleView = require('./moraleView');
var GeneralView = require('./generalView');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  turn: {
    height: 50,
  },
});

var BattleView = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 0,
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  menuHandler() {
    this.props.onMenu && this.props.onMenu();
  },
  refreshHandler() {
    console.log('refresh');
  },
  onChangeTab({i, ref}) {
    setTimeout(() => {
      this.setState({selectedTab: i});
    }, 500);
  },
  render() {
    //console.log(this.props);
    let battle = this.props.battle || {scenario: {}};
console.log('battleView');
console.log(battle);
    return (
      <View style={styles.container}>
        <TitleBar
          logo={icons[battle.image]}
          title={battle.name}
          subtitle={battle.scenario.name}
          onMenu={this.menuHandler}
          onRefresh={this.refreshHandler} />

        <TurnView st7le={styles.turn} current={this.props.current} />
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          onChangeTab={this.onChangeTab}
          edgeHitWidth={deviceWidth / 2}
          renderTabBar={() => <ScrollingTabBar />} >
          <FireView tabLabel="Fire" />
          <MeleeView tabLabel="Melee" />
          <MoraleView tabLabel="Morale" />
          <GeneralView tabLabel="General" />
        </ScrollableTabView>
      </View>
    );
  }
});

module.exports = BattleView;
