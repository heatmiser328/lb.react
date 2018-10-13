import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Style from '../../services/style';
import Morale from '../../services/morale';
import Icons from '../../res';

var MoraleTableView = React.createClass({
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
        let size = this.props.size || Math.min(this.state.height, this.state.width) || 16;
        return (
            <View style={{flex:1, marginTop: this.props.marginTop}}>
                <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Morale</Text>
                <View style={{flex:2}}>
                    <ScrollView
                        ref={view => this._scrollView = view}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.props.range.map((res,i) => {
                            let icon = res.morale ? (!res.result ? Icons['fail'] : Icons['pass']) : null;
                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.mediumlarge(),textAlign: 'center'}}>{res.morale}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.mediumlarge(),textAlign: 'center'}}>{res.modifier}</Text>
                                    </View>
                                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} onLayout={this.onLayout}>
                                        <Image style={{height: size, width: size, resizeMode: 'stretch'}} source={icon} />
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }    
});

module.exports = MoraleTableView;