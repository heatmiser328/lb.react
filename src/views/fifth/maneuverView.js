import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style,IconButton} from 'react-native-nub';
import Icons from '../../res';
import ManeuverUnit from './maneuverUnit';
import {resetMUCup,addMUToCup,removeMUFromCup,drawMUFromCup} from '../../actions/current';

var ManeuverView = React.createClass({
    onReset() {
        this.props.resetMUCup();        
    },
    onAdd(player) {
        return (e) => {
            this.props.addMUToCup(player);            
        }
    },
    onRemove(item) {
        return (e) => {        
            this.props.removeMUFromCup(item);            
        }
    },    
    onDraw() {        
        this.props.drawMUFromCup();//true);        
    },
    render() {                  
        let mu = this.props.mu || {};        
        return (
            <View style={{flex: 1}}>
                {/*top*/}
                <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Current</Text>                        
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <ManeuverUnit item={mu} size={88} />
                        </View>
                    </View>   
                </View>
                {/*bottom*/}
                <View style={{flex:6}}>
                    <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Available</Text>
                    <View style={{flex:1, flexDirection: 'row'}}>                    
                        {/*left*/}
                        <View style={{flex:1}}>                        
                            <ScrollView contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center'}}
                                automaticallyAdjustContentInsets={false}
                                scrollEventThrottle={200}>
                                {this.sides().map((p,i) => 
                                    <View key={i} style={{paddingBottom: 5, justifyContent: 'center'}}>
                                        <ManeuverUnit item={{image: p}} size={64} onPress={this.onAdd(p)} />                                        
                                    </View>
                                )}
                            </ScrollView>                        
                        </View>    
                        {/*center*/}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.draw} height={64} width={64} resizeMode='stretch' onPress={this.onDraw} />                            
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.resetcup} height={64} width={64} resizeMode='stretch' onPress={this.onReset} />                        
                            </View>                        
                        </View>                        
                        {/*right*/}
                        <View style={{flex:2}}>
                            <Image source={Icons.drawcup} resizeMode={'stretch'} style={{
                                flex: 1,
                                width: null,
                                height: null,
                                backgroundColor: 'transparent'
                            }}>                        
                                <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', 
                                        justifyContent:'space-around', alignItems:'flex-start', 
                                        marginTop: Style.Scaling.scale(70), 
                                        marginBottom: Style.Scaling.scale(30), 
                                        marginLeft: Style.Scaling.scale(30), 
                                        marginRight: Style.Scaling.scale(30)
                                    }}
                                >                            
                                    {this.props.cup.map((item,i) => 
                                        <ManeuverUnit key={i} item={item} size={32} onPress={this.onRemove(item)} />
                                    )}
                                </View>
                            </Image>                        
                        </View>                        
                    </View>
                </View>            
            </View>
        );
    },
    sides() {        
        if (this.props.battle.rules.maneuver) {
            return this.props.battle.rules.maneuver.sides;
        }
        return this.props.battle.players;
    }
});

const mapStateToProps = (state) => ({    
    cup: state.current.maneuver.cup || [],
    mu: state.current.maneuver.mu
});

const mapDispatchToProps =  ({resetMUCup,addMUToCup,removeMUFromCup,drawMUFromCup});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManeuverView);