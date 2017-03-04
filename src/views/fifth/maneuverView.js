import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import Icons from '../res';
import Button from '../components/button';
import maneuver from '../services/maneuver';
import getGame from '../selectors/game';

/*
Want to depict the draw cup

|-------------------------------------------|
|  Available                   Current      |
|  [    flag    ]           [   flag N  ]   |
|  [    flag    ]                           |
|                                           |
|                               Cup         |
| (   ^ Draw  )             [   flag N  ]   |
| (   v Reset  )            [   flag N  ]   |
|                           [ artillery ]   |
|                           [   leader  ]   |
|                           [  regroup  ]   |
|                           [  reinforc ]   |
|                                           |
|-------------------------------------------|

The available flags (representing Maneuver Units) are on the left. Touch a flag to add it to the cup.
Multiple touches increases count of items in cup.
Reset clears cup, adding only the standard action items.
Draw randomly selects 1 item from the cup. Current will be updated to represent the item drawn.

*/

var ManeuverView = React.createClass({
    getInitialState() {
        return {
            items: [],
            // this will be persisted, so will move to the store            
            cup: [],            
            current: null
        };
    },
    onReset() {
        this.setState({...maneuver.reset()});
    },
    onAdd(player) {
        return (e) => {
            this.setState({...maneuver.add(player,this.state.cup, this.state.items)});
        }
    },
    onRemove(item) {
        return (e) => {
            this.setState({...maneuver.add(item.image,this.state.cup, this.state.items)});
        }
    },    
    onDraw() {
        this.setState({...maneuver.draw(this.state.cup, this.state.items)});
    },
    render() {  
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {/*left*/}
                <View style={{flex:1}}>
                    <View style={{flex: 2}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Available</Text>
                        <ScrollView contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center'}}
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={200}>
                            {this.props.battle.players.map((p,i) => 
                                <View key={i} style={{flex: 1}}>
                                    <Button image={Icons[p]} nopadding={true} onPress={this.onAdd(p)} />
                                </View>
                            )}
                        </ScrollView>                        
                    </View>
                    <View style={{flex: 1}}>
                        <Button icon={Icons.draw} onPress={this.onDraw} />
                        <Button icon={Icons.resetcup} onPress={this.onReset} />
                    </View>
                </View>

                {/*right*/}
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Current</Text>
                        <Button image={Icons[this.state.current]} nopadding={true} />
                    </View>    

                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Remaining</Text>
                        <ScrollView contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center'}}
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={200}>
                            {this.state.cup.map((item,i) => 
                                <View key={i} style={{flex: 1,flexDirection:'row'}}>
                                    <Button image={Icons[item.image]} nopadding={true} onPress={this.onRemove(item)} />
                                    <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'center'}}>{item.count.toString()}</Text>
                                </View>
                            )}
                        </ScrollView>                        
                    </View>                        
                </View>                
            </View>
        );
    }
});


const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(ManeuverView);

