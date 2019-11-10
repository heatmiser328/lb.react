import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Style from '../../services/style';
import FireAttackerDetailView from './fireAttackerDetailView';
import FireAttackerValuesView from './fireAttackerValuesView';

var FireAttackerDetailView2 = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        if (this.props.battle.rules && this.props.battle.rules.fire && this.props.battle.rules.fire.attack && Object.keys(this.props.battle.rules.fire.attack).length > 0) {
            return (
                <View style={{flex:1}}>
                    <ScrollableTabView
                        style={{backgroundColor: '#fff'}}
                        tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}                
                        initialPage={this.state.initialPage}                    
                    >
                        <FireAttackerDetailView tabLabel="Value" battle={this.props.battle} onSet={this.props.onSet} onAdd={this.props.onAdd}/>
                        <FireAttackerValuesView tabLabel="Effects" battle={this.props.battle} onSet={this.props.onSet} />
                    </ScrollableTabView>                
                </View>
            );    
        } 
        return (
            <FireAttackerDetailView battle={this.props.battle} onSet={this.props.onSet} onAdd={this.props.onAdd}/>
        );
    }
});

module.exports = FireAttackerDetailView2;
