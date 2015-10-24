'use strict';

var React = require('react-native');
var { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } = React;
var battles = require('./battles.js');
var icons = require('./icons');

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
});

var BattleItem = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onPress() {
    console.log(this.props);
    this.props.onSelected && this.props.onSelected(this.props.battleid);
  },

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
      <View style={styles.battleItemContainer}>
        <Image style={styles.battleItemImage} source={icons[this.props.image]} />
        <View style={styles.battleItemRightContainer}>
          <Text style={styles.battleItemTitle}>{this.props.name}</Text>
          <Text style={styles.battleItemPublisher}>{this.props.publisher}</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
});

var NavMenu = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onPress() {
    console.log(this.props);
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
                    battleid={battle.id}
                    onSelected={this.props.onSelected}
                  />
              );

            })}
        </ScrollView>
      </View>
    );
  }
});

module.exports = NavMenu;
