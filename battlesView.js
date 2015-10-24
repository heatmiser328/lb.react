'use strict';

var React = require('react-native');
var { ScrollView, View, Text, Image, StyleSheet } = React;
var DrawerLayout = require("./DrawerLayout");
var battles = require('./data/battles.json');
var icons = require('./icons');

var MainView = React.createClass({

  getInitialState() {
    return {};
  },

  render: function() {
    var navigationView = (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}
        style={styles.scrollContainer}>
        {battles.map(createBattleItem)}
      </ScrollView>
    );

    return (
      <DrawerLayout
        onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
        onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
        drawerWidth={300}
        renderNavigationView={() => navigationView}>
          <LbView />
      </DrawerLayout>
    );
  }
});

var LbView = React.createClass({

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>La Bataille Assistant</Text>
        </View>
        <Image source={require('image!lb')} style={styles.backgroundImage}>
        </Image>
      </View>
    );
  }
});

var BattleItem = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={[styles.battleItemContainer]}>
        <Image style={styles.battleItemImage} source={icons[this.props.image]} />
        <View style={styles.battleItemRightContainer}>
          <Text style={styles.battleItemTitle}>{this.props.name}</Text>
          <Text style={styles.battleItemPublisher}>{this.props.publisher}</Text>
        </View>
      </View>
    );
  }
});

function createBattleItem(battle) {
    return <BattleItem name={battle.name} publisher={battle.publisher} image={battle.image} battleid={battle.id}/>;
}

var styles = StyleSheet.create({
  mainContainer: {
    //alignItems: 'flex-start',
    //justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'flex-start',
    flex: 1,
    width: null,
    height: 5,
    backgroundColor: 'green',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    width: null,
    color: 'blue',
    backgroundColor: 'gray',
  },
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'transparent',
  },
  scrollContainer: {
    backgroundColor: 'gray',
    flex: 1,
  },
  battleItemContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    margin: 7,
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

module.exports = MainView;
