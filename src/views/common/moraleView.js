import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Style} from 'react-native-nub';
import MoraleCheckView from './moraleCheckView';
import MoraleLevelsView from './moraleLevelsView';

var MoraleView = React.createClass({
    getInitialState() {
        return {
            page: 0
        };
    },
    componentDidMount() {
        if (this.levels() != null) {
            // hack to get the page to display (in a nested view)
            this.refs.tab.goToPage(-1);
            setTimeout(() => this.refs.tab.goToPage(this.state.page), 0);
        }
    },
    onChangeTab({i, ref}) {
    },    
    render() {        
        let levels = this.levels();
        return (
            <View style={{flex: 1}}>
            {levels != null 
                ? <ScrollableTabView
                    ref="tab"
                    style={{backgroundColor: '#fff'}}
                    tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}
                    onChangeTab={this.onChangeTab}
                    initialPage={this.state.page}>
                    <MoraleCheckView tabLabel="Check" battle={this.props.battle} />
                    <MoraleLevelsView tabLabel="Levels" battle={this.props.battle} levels={levels} />
                </ScrollableTabView>
                : <MoraleCheckView battle={this.props.battle} />
            }
            </View>
        );
    },
    rules() {
        if (this.props.battle.rules && this.props.battle.rules.hasOwnProperty('morale')) {
            return this.props.battle.rules.morale;
        }
    },
    levels() {
        let rules = this.rules();
        if (rules) {
            return (rules||{}).levels;
        }
        return null;        
    }    
});

module.exports = MoraleView;

