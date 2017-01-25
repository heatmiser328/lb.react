import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import Icons from '../res';
import getGame from '../selectors/game';

var VictoryConditionsView = React.createClass({
    render() {        
        return (
            <ScrollView contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center', marginLeft:5, marginRight:5}}
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}>
                {this.props.battle.victory.map((v,i) => 
                    <View key={i} style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width: 64,height: 64,resizeMode: 'contain'}} source={Icons[v.side]}/>
                            <Text style={{fontWeight:'bold',fontSize:18,textAlign:'center'}}>{v.level}</Text>
                        </View>
                        <View style={{flex:4}}>
                            <Text >{v.conditions}</Text>
                        </View>                        
                    </View>
                )}
            </ScrollView>
        );
    }
});


const mapStateToProps = (state) => ({
    battle: getGame(state)
});

module.exports = connect(
  mapStateToProps
)(VictoryConditionsView);

