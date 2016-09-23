'use strict'

var React = require('react');
import { View, Text } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var MeleeAssaultView = require('./meleeAssaultView');
var MeleeChargeView = require('./meleeChargeView');
var MeleeResolutionView = require('./meleeResolutionView');

var MeleeView = React.createClass({
    getInitialState() {
        return {
            page: 1
        };
    },
    componentDidMount() {
        // hack to get the page to display (in a nested view)
        this.refs.tab.goToPage(-1);
        setTimeout(() => this.refs.tab.goToPage(this.state.page), 0);
    },
    onChangeTab({i, ref}) {
    },
    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    ref="tab"
                    style={{backgroundColor: '#fff'}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.page}>
                    <MeleeAssaultView tabLabel="Assault" events={this.props.events} />
                    <MeleeChargeView tabLabel="Charge" events={this.props.events} />
                    <MeleeResolutionView tabLabel="Resolution" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = MeleeView;
