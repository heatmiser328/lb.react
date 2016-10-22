'use strict'
var React = require('react');
import { View, Text, Image, ScrollView } from 'react-native';
var Icons = require('./res/icons');
var Fire = require('./services/fire');
var LeaderLoss = require('./services/leaderloss');

var ResultsView = React.createClass({
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
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
                    </View>
                    <View style={{flex:.5}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Leader</Text>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Duration</Text>
                    </View>
                    <View style={{flex:.5}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Cond</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <ScrollView
                        ref={view => this._scrollView = view}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {Fire.resolvePossible(this.props.firedice).map((res,i) => {
                            let ll = LeaderLoss.resolve(this.props.firedice, this.props.lossdie, this.props.durationdie1, this.props.durationdie2) || {};
                            let text = res.odds == this.props.odds ? 'white' : 'black';
                            let background = res.odds == this.props.odds ? 'goldenrod' : 'transparent';
                            let loss = (ll.result || '').toLowerCase();
                            let lossIcon = null;
                            if (loss.startsWith('flesh')) {
                                lossIcon = null;
                            } else if (loss == 'capture') {
                                lossIcon = Icons.capture;
                            } else {
                                lossIcon = (ll.mortal ? Icons.mortal : Icons.wounded);
                            }
                            if (res.odds == this.props.odds) {
                                this.state.selected = i;
                            }

                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row', backgroundColor: background}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: 16,textAlign: 'center', color:text}}>{res.odds}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: 16,textAlign: 'center', color:text}}>{res.result}</Text>
                                    </View>
                                    <View style={{flex:.5, justifyContent: 'center'}}>
                                        {ll.leader
                                            ? <Image style={{flex: 1, alignSelf:'center', height: 28, width: 28, resizeMode: 'stretch'}} source={ll.leader == 'A' ? Icons.attackerLoss : Icons.defenderLoss} />
                                            : <Text />
                                        }
                                        {/*<Text style={{fontSize: 16,textAlign: 'center', color:text}}>{ll.leader}</Text>*/}
                                    </View>
                                    <View style={{flex:2}}>
                                        <Text style={{fontSize: 16,textAlign: 'center', color:text}}>{ll.result}</Text>
                                    </View>
                                    <View style={{flex:.5, justifyContent: 'center'}}>
                                        {ll.leader && lossIcon
                                            ? <Image style={{flex: 1, alignSelf:'center', height: 28, width: 28, resizeMode: 'stretch'}} source={lossIcon} />
                                            : <Text />
                                        }
                                        {/*<Text style={{fontSize: 16,textAlign: 'center', color:text}}>{ll.mortal ? 'Mortal' : ''}</Text>*/}
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

module.exports = ResultsView;
