'use strict';

var React = require('react-native');
var { View, ScrollView } = React;
var BattleItem = require('./battleItem');
var battles = require('../../core/battles.js');

var NavMenu = React.createClass({
  onPress(e) {
    //console.log(this.props);
    this.props.onSelected && this.props.onSelected(e);
  },

  render() {
    return (
      <View style={{flex: 1,backgroundColor: '#fff'}}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={{backgroundColor: 'transparent',flex: 1}}>
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

module.exports = NavMenu;
