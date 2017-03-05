import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import {RadioButtonGroup,Style} from 'react-native-nub';
import {setRuleSet,save} from '../actions/current';

var ConfigurationView = React.createClass({
    rulesets: [
        {label:'Premier',value:1, disabled: false},
        {label:'5th Edition',value:5, disabled: false},
        {label:'Regulations XXX',value:3, disabled: true},
        {label:'Marie-Louise',value:4, disabled: true},
        {label:'Neutral',value:0, disabled: false}
    ],
    onRulesChanged(v) {
        this.props.setRuleSet(v);
        this.props.save().done();
    },    
    render() {
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44)}}>
                {/* Enable/Disable sounds? */}
                <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Rule Set</Text>
                <View style={{flex: 1}}>
                    <RadioButtonGroup title={'Select a set of Rules to play'} direction={'vertical'}
                        buttons={this.rulesets}
                        state={this.props.ruleset}
                        onSelected={this.onRulesChanged}/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: Style.Font.medium(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Coming Soon...</Text>                    
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Text style={{fontSize: Style.Font.medium()}}>5th Edition</Text>
                        <Text style={{fontSize: Style.Font.medium()}}>Regulations XXX</Text>
                        <Text style={{fontSize: Style.Font.medium()}}>Marie-Louise</Text>        
                    </View>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    ruleset: +state.current.ruleset
});

const mapDispatchToProps =  ({setRuleSet,save});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConfigurationView);
