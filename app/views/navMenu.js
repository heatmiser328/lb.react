'use strict';

var React = require('react-native');
var { View, Text, Image, ScrollView, ListView, TouchableOpacity, StyleSheet } = React;
var battles = require('../core/battles.js');
var icons = require('./icons');
var moment = require('moment');

var styles = StyleSheet.create({
  container: {
    //alignItems: 'flex-start',
    flex: 1,
    //width: 100,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  battleItemContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  battleItemImage: {
    //flex: 1,
    //width: null,
    //height: null,
    width: 96,
    height: 96,
    resizeMode: 'contain',
    //backgroundColor: 'transparent',
  },
  battleItemRightContainer: {
    flex: 1,
  },
  battleItemTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  battleItemPublisher: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: 'blue',
  },
  scenarioItemContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    //padding: 1,
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  scenarioItemTitle: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 2,
  },
});

var NavMenu = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onPress(e) {
    //console.log(this.props);
    this.props.onSelected && this.props.onSelected(e);
  },

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollContainer}>
            {battles.battles.map((battle, i) => {
              return (
                  <BattleItem
                    key={i}
                    name={battle.name}
                    publisher={battle.publisher}
                    image={battle.image}
                    scenarios={battle.scenarios}
                    battleid={battle.id}
                    onSelected={this.onPress}
                  />
              );
            })}
        </ScrollView>
      </View>
    );
  }
});

var BattleItem = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //console.log('render ' + this.props.name + ' with ' + this.props.scenarios.length + ' scenarios');

    return (
      <View style={styles.container}>
        <View style={styles.battleItemContainer}>
          <Image style={styles.battleItemImage} source={icons[this.props.image]} />
          <View style={styles.battleItemRightContainer}>
            <Text style={styles.battleItemTitle}>{this.props.name}</Text>
            <Text style={styles.battleItemPublisher}>{this.props.publisher}</Text>
          </View>
        </View>
        <ListView
          dataSource={ds.cloneWithRows(this.props.scenarios)}
          renderRow={(scenario) => {
            //console.log('render ' + scenario.name);
            return (
              <ScenarioItem
                name={scenario.name}
                start={new Date(scenario.start.year, scenario.start.month, scenario.start.day, scenario.start.hour, scenario.start.minute)}
                end={new Date(scenario.end.year, scenario.end.month, scenario.end.day, scenario.end.hour, scenario.end.minute)}
                scenarioid={scenario.id}
                onSelected={this.props.onSelected}
              />
            );
          }}
        />
      </View>
    );
  }
});

var ScenarioItem = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onPress() {
    //console.log(this.props);
    let scenario = battles.scenario(this.props.scenarioid);
    this.props.onSelected && this.props.onSelected(scenario);
  },
  render() {
    let startdt = moment(this.props.start);
    let enddt = moment(this.props.end);
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.scenarioItemContainer}>
          <Text style={styles.scenarioItemTitle}>{this.props.name}</Text>
          <Text style={styles.scenarioItemTitle}>
            {startdt.format("MMM DD, YYYY hh:mm A")}{' - '}{enddt.format("hh:mm A")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
});

module.exports = NavMenu;
