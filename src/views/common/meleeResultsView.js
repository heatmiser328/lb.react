import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {RadioButtonGroup} from 'react-native-nub';
import Style from '../../services/style';

var MeleeResultsView = React.createClass({
    getInitialState() {        
        let formations = this.formations();
        let statuses = this.statuses(formations[0]);
        return {            
            formation: formations[0],
            status: statuses[0]
        };
    },
    onFormationChanged(v) {        
        this.state.formation = v;
        this.updateStatuses();
        this.setState(this.state);
    },
    onStatusChanged(v) {
        this.state.status = v;    
        this.setState(this.state);    
    },
    render() {        
        let results = Object.keys(this.rules().matrix[this.state.formation][this.state.status]);
        let table = this.rules().index;
        return (
            <View style={{flex:3, flexDirection:'row'}}>
                <View style={{flex:4, justifyContent: 'flex-start', borderRightWidth: 1, borderRightColor: 'gray'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex:1}}>
                            <RadioButtonGroup title={'Defending'} labelFontSize={Style.Size.Label} direction={'vertical'}
                                buttons={this.formations().map((n) => ({label:n,value:n, fontSize: Style.Size.ListItem}))}
                                state={this.state.formation}
                                onSelected={this.onFormationChanged}/>
                            <RadioButtonGroup title={'Status'} labelFontSize={Style.Size.Label} direction={'vertical'}
                                buttons={this.statuses(this.state.formation).map((f) => ({label:f,value:f, fontSize: Style.Size.ListItem}))}
                                state={this.state.status}
                                onSelected={this.onStatusChanged}/>
                        </View>
                        <View style={{flex:4, borderLeftWidth:1, borderLeftColor:'gray'}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Result</Text>
                                </View>
                                <View style={{flex:6}}>
                                    <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Explanation</Text>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <ScrollView                                    
                                    automaticallyAdjustContentInsets={false}
                                    scrollEventThrottle={200}>
                                    {results.map((res,i) => 
                                        <View key={i} style={{flex:1, flexDirection: 'row', borderBottomWidth:1, borderBottomColor:'gray'}}>
                                            <View style={{flex:1}}>
                                                <Text style={{fontSize: Style.Font.mediumlarge(),textAlign: 'center'}}>{res}</Text>
                                            </View>
                                            <View style={{flex:6}}>
                                                <Text style={{fontSize: Style.Font.fontScale(16)}}>{this.result(this.state.formation,this.state.status,res)}</Text>
                                            </View>
                                        </View>                                        
                                    )}
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        );
    },
    rules() {
        return this.props.battle.rules.melee.results;
    },
    formations() {        
        return Object.keys(this.rules().matrix);
    },
    statuses(formation) {        
        return Object.keys(this.rules().matrix[formation]);
    },
    updateStatuses() {
        let statuses = this.statuses(this.state.formation);
        if (statuses.indexOf(this.state.status) < 0) {
            this.state.status = statuses[0];
        }
    },
    result(formation,status,res) {
        let i = this.rules().matrix[formation][status][res];
        return this.rules().index[i];
    }
});


module.exports = MeleeResultsView;