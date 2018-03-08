import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import ChargeStandView from './chargeStandView';
import ChargeCarreView from './chargeCarreView';
import ChargeRecallView from './chargeRecallView';

var ChargeView = React.createClass({
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
                    tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.page}>
                    <ChargeStandView tabLabel="Stand" battle={this.props.battle} />
                    <ChargeCarreView tabLabel="Form Square" battle={this.props.battle} />
                    <ChargeRecallView tabLabel="Recall" battle={this.props.battle} />
                </ScrollableTabView>
            </View>
        );
    }
});

module.exports = ChargeView;