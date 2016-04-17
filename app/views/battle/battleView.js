'use strict'

var React = require('react-native');
var { View } = React;
var EventEmitter = require('EventEmitter');
var icons = require('../../../icons');
var TitleBar = require('../titleBar');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var FireView = require('./fireView');
var MeleeView = require('./meleeView');
var MoraleView = require('./moraleView');
var GeneralView = require('./generalView');
var Current = require('../../core/current');

var BattleView = React.createClass({
  getInitialState() {
    return {
      battle: this.props.battle
    };
  },
  componentWillMount: function() {
      this.eventEmitter = new EventEmitter();
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  menuHandler() {
    this.props.onMenu && this.props.onMenu();
  },
  refreshHandler() {
    console.log('Reset ' + this.props.battle.name);
    Current.reset(this.props.battle)
    .then((current) => {
        // update the views?
        this.eventEmitter.emit('reset');
    })
    .done();
  },
  onChangeTab({i, ref}) {
  },
  render() {
    let battle = this.state.battle || {scenario: {}};
    return (
      <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
        <TitleBar
          logo={icons[battle.image+'-sm']}
          title={battle.name}
          subtitle={battle.scenario.name}
          onMenu={this.menuHandler}
          onRefresh={this.refreshHandler} />
        <TurnView events={this.eventEmitter} />
        <ScrollableTabView
          style={{backgroundColor: '#fff'}}
          onChangeTab={this.onChangeTab}
          initialPage={0}
         >
          <FireView tabLabel="Fire" events={this.eventEmitter} />
          <MoraleView tabLabel="Morale" events={this.eventEmitter} />
          <MeleeView tabLabel="Melee" events={this.eventEmitter} />
          <GeneralView tabLabel="General" events={this.eventEmitter} />
        </ScrollableTabView>
      </View>
    );
  }
});

module.exports = BattleView;
