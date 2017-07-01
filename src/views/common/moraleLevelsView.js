import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {Style,SpinSelect} from 'react-native-nub';
import Icons from '../../res';
import {setMoraleLevel} from '../../actions/current';


var MoraleLevelView = React.createClass({
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
        let iconsize = 40;//(Math.min(this.state.height, this.state.width) * 0.75) || 16;    
        let curlevel = this.currentLevel(this.props.level);

        //let level = '(' + curlevel.mod.toString() + ') ' + curlevel.desc;
        return (
            //{/*<TouchableOpacity onPress={() =>this.props.onPress && this.props.onPress(this.props.level, curlevel)} */}
            <View style={{flex:1, flexDirection:'row', paddingTop:2,paddingBottom:2,borderBottomWidth:2,borderBottomColor:'gray'}}>
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}} onLayout={this.onLayout}>
                    <Image style={{width: iconsize,height: iconsize,resizeMode: 'contain'}} source={Icons[this.props.level.image]}/>
                </View>
                <View style={{flex:3, justifyContent:'center'}}>
                    <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'left'}}>{this.props.level.name}</Text>
                </View>         
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'center'}}>{curlevel.mod.toString()}</Text>
                </View>                                        
                {/*                
                <View style={{flex:3, justifyContent:'center'}}>
                    <Text style={{fontSize:Style.Font.medium(),fontWeight:'bold',textAlign:'center'}}>{curlevel.desc}</Text>
                </View>
                */}
                <View style={{flex:4, justifyContent:'center'}}>
                    <SpinSelect value={curlevel.desc} 
                        onPrev={() =>this.props.onPress && this.props.onPress(this.props.level.formation, curlevel.level-1)} 
                        onNext={() =>this.props.onPress && this.props.onPress(this.props.level.formation, curlevel.level+1)} 
                    />
                </View>
            {/*</TouchableOpacity>*/}
            </View>
        );
    },
    currentLevel(l) {
        /* l = 
            {
				"image": string,
				"formation": string,
				"name": string,
				"levels": [
					{"level": int, "desc": string, "mod": int}
				]
			}
        */        
        var cl = l.levels.find((lvl) => lvl.level == this.props.currentlevels[l.formation]);
        if (cl) {
            return cl;
        }
        return l.levels[0];
    }
});


var MoraleLevelsView = React.createClass({
    onChangeLevel(formation, level) {        
        if (level < 0) {
            level = 0;
        } else if (level > 3) {
            level = 3;
        }        
        this.props.setMoraleLevel(formation, level);
    },
    render() {    
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Levels</Text>
                <ScrollView contentContainerStyle={{marginLeft:5, marginRight:5}}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {this.props.levels.map((l,i) => 
                        <MoraleLevelView key={i} currentlevels={this.props.currentlevels} level={l} onPress={this.onChangeLevel} />
                    )}
                </ScrollView>
            </View>
        );
    }
});


const mapStateToProps = (state) => ({    
    currentlevels: state.current.moralelevels || {}
});

const mapDispatchToProps =  ({setMoraleLevel});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoraleLevelsView);


