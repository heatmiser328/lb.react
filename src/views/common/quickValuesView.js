import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Style from '../../services/style';

var QuickValuesView = React.createClass({
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
    onQuickValue(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v.toString());
        }
    },
    render() {        
        let c = (this.props.values.length || 1);        
        let size = ((this.state.width - (c * 6)) / c);
        if (!this.props.fit) {            
            size = ((this.state.height - 6) / 2);            
        }
        return (
            <View style={{flex:1, flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center', alignItems:'flex-start'}} onLayout={this.onLayout}>
                {this.props.values.map((v,i) => 
                    <TouchableOpacity key={i} onPress={this.onQuickValue(v)} 
                    style={{alignItems: 'center', justifyContent: 'center',
                        height: size, width: size,
                        backgroundColor: 'lightgray', 
                        marginTop: 3,
                        marginLeft: i == 0 ? 3 : 0,
                        marginRight: 3,
                        padding: Style.Padding.pad(5),
                        borderColor: 'black', borderWidth: 1, borderRadius:5                    
                    }}>                            
                        <Text style={{color: 'black', fontSize: Style.Font.xlarge(), textAlign: 'center', alignSelf:'center'}}>{v.toString()}</Text>
                    </TouchableOpacity>
                )}
            </View>                                         
        );
        
        /*
        return (
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
            {
                this.props.values.map((v, i) => 
                    <TouchableOpacity key={i} onPress={this.onQuickValue(v)}
                        style={{flex:1, flexWrap: 'wrap', backgroundColor: 'lightgray', justifyContent:'center', alignItems: 'center',
                            //height: this.props.height || 48,
                            marginLeft: i == 0 ? 3 : 0,
                            marginRight: 3,
                            padding: Style.Padding.pad(5),
                            borderColor: 'black', borderWidth: 1, borderRadius:5}}>
                        <Text style={{color: 'black', fontSize: Style.Font.mediumlarge(), textAlign: 'center', alignSelf:'center'}}>{v.toString()}</Text>
                    </TouchableOpacity>
                )
            }
            </View>
        );
        */
    }
});

module.exports = QuickValuesView;