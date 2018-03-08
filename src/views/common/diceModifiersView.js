import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import {Style} from 'react-native-nub';

var DiceModifiersView = React.createClass({
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
    onModifier(v) {
        return () => {
            this.props.onChange && this.props.onChange(+v);
        }
    },
    render() {        
        let height = (Math.min(this.state.height, this.state.width) * 0.75) || null;
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} onLayout={this.onLayout}>
            {
                ['-6','-3','-1','+1','+3','+6'].map((v, i) => (
                    <TouchableOpacity key={i} onPress={this.onModifier(v)}
                        style={{
                            flex: 1,
                            //width: 16,
                            height: height,
                            padding: Style.Padding.pad(5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: i == 0 ? 2 : 0,                                
                            marginRight: 2,
                            backgroundColor: 'blue',
                            //backgroundColor: '#3F51B5'
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius:5
                        }}>
                        <Text style={{color: 'white', fontSize: Style.Font.large(), textAlign: 'center', alignSelf:'center'}}>{v}</Text>
                    </TouchableOpacity>
                    )
                )
            }
            </View>
        );
    }
});

module.exports = DiceModifiersView;
