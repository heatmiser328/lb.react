import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import {Style} from 'react-native-nub';
import Icons from '../res';
import getGame from '../selectors/game';

var VictoryConditionsView = React.createClass({
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
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    render() {    
        let iconsize = (Math.min(this.state.height, this.state.width) * 0.75) || 16;    
        return (
            <ScrollView contentContainerStyle={{flex:1, justifyContent:'flex-start', alignItems:'center', marginLeft:5, marginRight:5}}
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}>
                {this.props.battle.victory.map((v,i) => 
                    <View key={i} style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent:'center',alignItems:'center'}} onLayout={this.onLayout}>
                            <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain'}} source={Icons[v.side]}/>
                            <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'center'}}>{v.level}</Text>
                        </View>
                        <View style={{flex:4, justifyContent:'center'}}>
                            <Text style={{fontSize: Style.Font.smallmedium()}}>{v.conditions}</Text>
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

