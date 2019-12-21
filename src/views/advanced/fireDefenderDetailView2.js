import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Style from '../../services/style';
import FireDefenderDetailView from './fireDefenderDetailView';
import FireDefenderMoraleView from './fireDefenderMoraleView';

var FireDefenderDetailView2 = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        if (this.props.battle.rules && this.props.battle.rules.morale && this.props.battle.rules.morale.fire && Object.keys(this.props.battle.rules.morale.fire).length > 0) {
            return (
                <View style={{flex:1}}>
                    <ScrollableTabView
                        style={{backgroundColor: '#fff'}}
                        tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}                
                        initialPage={this.state.initialPage}                    
                    >
                        <FireDefenderDetailView tabLabel="Value" battle={this.props.battle} onSet={this.props.onSet} onAdd={this.props.onAdd}/>
                        <FireDefenderMoraleView tabLabel="Morale" battle={this.props.battle} />
                    </ScrollableTabView>                
                </View>
            );    
        } 
        return (
            <FireDefenderDetailView battle={this.props.battle} onSet={this.props.onSet} onAdd={this.props.onAdd}/>
        );
    }
});

module.exports = FireDefenderDetailView2;
