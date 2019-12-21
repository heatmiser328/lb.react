import React from 'react';
import { View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import ArtilleryView from './artilleryView';
import TerrainEffectsView from './terrainEffectsView';
import TerrainStackingView from './terrainStackingView';
import Style from '../../services/style';
import getRules from '../../selectors/rules';

/*
    Movement [
        Effects
            Terrain Image Inf Cav Art
        Stacking
            Terrain Image Inf Cav Art Cmb

    ]
    Artillery [

    ]

*/


var MovementView = React.createClass({
    getInitialState() {
        return {
            initialPage: 0
        };
    },
    render() {        
        return (
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Terrain Effects</Text>
                <View style={{flex: 1}}>
                    <ScrollableTabView
                        style={{backgroundColor: '#fff'}}
                        tabBarTextStyle={{fontSize: Style.Font.mediumlarge()}}                
                        initialPage={this.state.initialPage}                    
                    >
                        <TerrainEffectsView tabLabel="Costs" terrain={this.props.rules.maneuver.terrain} />
                        <TerrainStackingView tabLabel="Stacking" stacking={this.props.rules.maneuver.stacking} />                        
                    </ScrollableTabView>                                    
                </View>
                <View style={{flex: 1}}>
                    <ArtilleryView />
                </View>                
            </View>
        );
    },

});

const mapStateToProps = (state) => ({
    rules: getRules(state)
});

module.exports = connect(
  mapStateToProps
)(MovementView);
