'use strict'
var React = require('react');
import { View, Text, Image, ScrollView } from 'react-native';
var Icons = require('./res/icons');
var Morale = require('./services/morale');
var LeaderLoss = require('./services/leaderloss');
//var LeaderLossView = require('./leaderLossView');

var CombatResultsView = React.createClass({
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
            <View style={{flex:1, flexDirection:'row'}}>
                {this.renderCombatResults()}
                {this.renderLeaderLoss()}
                {this.renderMoraleResults()}
            </View>
        );
    },
    renderCombatResults() {
        return (
            <View style={{flex:2}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
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
                                        <Text style={{fontSize: 16,textAlign: 'center', color:text}}>{res.odds}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: 16,textAlign: 'center', color:text}}>{res.result}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    },
    
    renderLeaderLoss() {
        let ll = LeaderLoss.resolve(this.props.combatdice, this.props.lossdie, this.props.durationdie1, this.props.durationdie2, this.props.melee) || {};
        let loss = (ll.result || '').toLowerCase();
        let lossIcon = null;
        if (loss.startsWith('flesh')) {
            lossIcon = null;
        } else if (loss == 'capture') {
            lossIcon = Icons.capture;
        } else {
            lossIcon = (ll.mortal ? Icons.mortal : Icons.wounded);
        }
        return (
            //<LeaderLossView style={{flex: 1}} leader={ll.leader} loss={loss} mortal={ll.mortal} />
            <View style={{flex:3, alignItems:'center'}}>
                <View style={{flex:1,alignSelf: 'stretch'}}>
                    <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Leader Loss</Text>
                </View>            
                <View style={{flex:2}}/>
                <View style={{flex:1, flexDirection:'row'}}>            
                    <View style={{flex:3, alignItems:'center'}}>
                        <Text style={{fontSize: 16,textAlign: 'center'}}>{ll.result}</Text>
                    </View>
                    <View style={{flex:2, justifyContent: 'center'}}>
                        {ll.leader && lossIcon
                            ? <Image style={{flex: 1, alignSelf:'center', height: 64, width: 64, resizeMode: 'stretch'}} source={lossIcon} />
                            : <Text />
                        }
                        {/*<Text style={{fontSize: 16,textAlign: 'center'}}>{ll.mortal ? 'Mortal' : ''}</Text>*/}
                    </View>             
                </View>
                <View style={{flex:2}}/>
            </View>
        );
    },
    
    renderMoraleResults() {
        return (
            <View style={{flex:2}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Morale</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Mod</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <ScrollView
                        ref={view => this._scrollView = view}
                        automaticallyAdjustContentInsets={false}
                        scrollEventThrottle={200}>
                        {Morale.resolvePossible(this.props.moraledice).map((res,i) => {
                            let icon = res.morale ? (!res.result ? Icons['fail'] : Icons['pass']) : null;
                            return (
                                <View key={i} style={{flex:1, flexDirection: 'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: 16,textAlign: 'center'}}>{res.morale}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontSize: 16,textAlign: 'center'}}>{res.modifier}</Text>
                                    </View>
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        <Image style={{height: 28, width: 28, resizeMode: 'stretch'}} source={icon} />
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

module.exports = CombatResultsView;
