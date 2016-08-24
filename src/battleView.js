'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
//var FireView = require('./battle/fireView');
//var MeleeView = require('./battle/meleeView');
//var MoraleView = require('./battle/moraleView');
//var GeneralView = require('./battle/generalView');
var Current = require('./services/current');
var icons = require('./res/icons');

var BattleView = React.createClass({
    getInitialState() {
        return {
            battle: this.props.battle,
            initialPage: 0
        };
    },
    componentWillMount: function() {
        this.props.events.addListener('menureset', this.onReset);
    },
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    onReset() {
        //console.log('Reset ' + this.props.battle.name);
        Current.reset(this.props.battle)
        .then((current) => {
            // update the views?
            this.props.events.emit('reset');
        })
        .done();
    },
    onChangeTab({i, ref}) {
    },
    render() {
        let battle = this.state.battle || {scenario: {}};
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={icons[battle.image]} events={this.props.events} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}
                >
                    <Text tabLabel="Fire" events={this.props.events} />
                    <Text tabLabel="Morale" events={this.props.events} />
                    <Text tabLabel="Melee" events={this.props.events} />
                    <Text tabLabel="General" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BattleView;
