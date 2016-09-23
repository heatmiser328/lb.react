'use strict'

var React = require('react');
import { View } from 'react-native';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var MeleeChargeStandView = require('./meleeChargeStandView');
var MeleeChargeCarreView = require('./meleeChargeCarreView');

var MeleeChargeView = React.createClass({
    getInitialState() {
        return {
            page: 0
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
                    <MeleeChargeStandView tabLabel="Stand" events={this.props.events} />
                    <MeleeChargeCarreView tabLabel="Form Square" events={this.props.events} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = MeleeChargeView;
