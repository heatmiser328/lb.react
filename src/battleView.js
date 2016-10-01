'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TurnView = require('./turnView');
var FireView = require('./fireView');
//var MeleeView = require('./meleeView');
var MeleeAssaultView = require('./meleeAssaultView');
var MeleeChargeView = require('./meleeChargeView');
var MeleeResolutionView = require('./meleeResolutionView');
var MoraleView = require('./moraleView');
var GeneralView = require('./generalView');
var Current = require('./services/current');
var icons = require('./res/icons');

var BattleView = React.createClass({
    getInitialState() {
        return {
            battle: this.props.battle,
            initialPage: 1
        };
    },
    componentWillMount() {
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
        let b = Current.battle();
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <TurnView logo={icons[battle.image]} events={this.props.events} />
                <ScrollableTabView
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.initialPage}
                >
                    {b.melee ? <MeleeChargeView tabLabel="Charge" events={this.props.events} /> : null}
                    <FireView tabLabel="Fire" events={this.props.events} />
                    <MoraleView tabLabel="Morale" events={this.props.events} />
                    {b.melee ? <MeleeAssaultView tabLabel="Assault" events={this.props.events} /> : null}
                    <MeleeResolutionView tabLabel="Melee" events={this.props.events} />
                    <GeneralView tabLabel="General" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = BattleView;
