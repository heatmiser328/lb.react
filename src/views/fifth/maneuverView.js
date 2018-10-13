import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {IconButton} from 'react-native-nub';
import Style from '../../services/style';
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
        let btnsize = Style.Scaling.scale(88);
        let curmusize = Style.Scaling.scale(96);
        let addmusize = Style.Scaling.scale(72);
        return (
            <View style={{flex: 1}}>
                {/*top*/}
                <View style={{flex:2, flexDirection: 'row'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Current</Text>                        
                        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                            <ManeuverUnit item={mu} size={curmusize} />
                        </View>
                    </View>   
                </View>
                {/*bottom*/}
                <View style={{flex:6}}>
                    <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Available</Text>
                    <View style={{flex:1, flexDirection: 'row'}}>                    
                        {/*left*/}
                        <View style={{flex:1}}>                        
                            <ScrollView contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center'}}
                                automaticallyAdjustContentInsets={false}
                                scrollEventThrottle={200}>
                                {this.sides().map((p,i) => 
                                    <View key={i} style={{paddingBottom: 5, justifyContent: 'center'}}>
                                        <ManeuverUnit item={{image: p}} size={addmusize} onPress={this.onAdd(p)} />                                        
                                    </View>
                                )}
                            </ScrollView>                        
                        </View>    
                        {/*center*/}
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.draw} height={btnsize} width={btnsize} resizeMode='stretch' onPress={this.onDraw} />                            
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                                <IconButton image={Icons.resetcup} height={btnsize} width={btnsize} resizeMode='stretch' onPress={this.onReset} />                        
                            </View>                        
                        </View>                        
                        {/*right*/}
                        <View style={{flex:2.5}}>
                            <Image source={Icons.drawcup} resizeMode={'stretch'} style={{
                                flex: 1,
                                width: null,
                                height: null,
                                backgroundColor: 'transparent'
                            }}>                        
                                <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap', 
                                        justifyContent:'space-around', alignItems:'flex-start', 
                                        marginTop: Style.Scaling.scale(115), 
                                        marginBottom: Style.Scaling.scale(40), 
                                        marginLeft: Style.Scaling.scale(40), 
                                        marginRight: Style.Scaling.scale(40)
                                    }}
                                >                            
                                    {this.props.cup.map((item,i) => 
                                        <ManeuverUnit key={i} item={item} size={Style.Scaling.scale(48)} onPress={this.onRemove(item)} />
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