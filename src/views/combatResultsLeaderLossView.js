import React from 'react';
import { View, Text, Image } from 'react-native';
import {Style} from 'react-native-nub';
import Icons from '../res';
import LeaderLoss from '../services/leaderloss';

var CombatResultsLeaderLossView = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    render() {        
        let size = this.props.size || Math.min(this.state.height, this.state.width) || 32;
        let ll = LeaderLoss.resolve(this.props.combatdice, this.props.lossdie, this.props.durationdie1, this.props.durationdie2, this.props.melee);
        let loss = ll.result;
        let lossIcon = null;
        if (loss.startsWith('Flesh')) {
            lossIcon = null;
        } else if (loss == 'Capture') {
            lossIcon = Icons.capture;
        } else if (ll.mortal) {
            //lossIcon = (ll.mortal ? Icons.mortal : Icons.wounded);
            lossIcon = Icons.mortal;
            loss = ll.result;         
        } else {
            lossIcon = (ll.result == 'Leg' ? Icons.leg : Icons.arm);
            loss = ll.duration;
        }
        return (
            <View style={{flex:3, alignItems:'center'}}>
                <View style={{flex:1,alignSelf: 'stretch'}}>
                    <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Leader Loss</Text>
                </View>            
                <View style={{flex:5, flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>            
                    <View style={{flex:3, alignItems:'center'}}>
                        <Text style={{fontSize: Style.Font.large(),textAlign: 'center'}}>{loss}</Text>
                    </View>
                    <View style={{flex:2, justifyContent: 'center'}} onLayout={this.onLayout}>
                        {ll.leader && lossIcon
                            ? <Image style={{flex: 1, alignSelf:'center', height: size, width: size, resizeMode: 'stretch'}} source={lossIcon} />
                            : null
                        }
                    </View>             
                </View>
            </View>
        );
    }

});

module.exports = CombatResultsLeaderLossView;
