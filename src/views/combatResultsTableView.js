import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Style} from 'react-native-nub';

var CombatResultsTableView = React.createClass({
    getInitialState() {
        return {
            selected: 0
        };
    },
    componentDidUpdate() {
        this._scrollView.scrollTo({x:0, y: this.state.selected * 18, animated: true});
    },
    render() {
        this.state.selected = 0;
        return (
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: Style.Font.smallmedium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <ScrollView
                        ref={view => this._scrollView = view}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {this.props.results.map((res,i) => {
                            let text = res.odds == this.props.odds ? 'white' : 'black';
                            let background = res.odds == this.props.odds ? 'goldenrod' : 'transparent';
                            if (res.odds == this.props.odds) {
                                this.state.selected = i;
                            }

                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row', backgroundColor: background}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.medium(),textAlign: 'center', color:text}}>{res.odds}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: Style.Font.medium(),textAlign: 'center', color:text}}>{res.result}</Text>
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

module.exports = CombatResultsTableView;
