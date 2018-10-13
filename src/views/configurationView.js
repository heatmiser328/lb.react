import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import {RadioButtonGroup} from 'react-native-nub';
import Style from '../services/style';
import {setRuleSet} from '../actions/current';

var ConfigurationView = React.createClass({
    rulesets: [
        {label:'Premier',value:1, disabled: false, fontSize: Style.Size.ListItem},
        {label:'5th Edition',value:5, disabled: false, fontSize: Style.Size.ListItem},
        {label:'Regulations XXX',value:3, disabled: true, fontSize: Style.Size.ListItem},
        {label:'Marie-Louise',value:4, disabled: true, fontSize: Style.Size.ListItem},
        {label:'Basic',value:0, disabled: false, fontSize: Style.Size.ListItem}
    ],
    onRulesChanged(v) {
        this.props.setRuleSet(v);        
    },    
    render() {
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.titleBarHeight}}>
                {/* Enable/Disable sounds? */}
                <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Rule Set</Text>
                <RadioButtonGroup direction={'vertical'}
                    buttons={this.rulesets}
                    state={this.props.ruleset}
                    onSelected={this.onRulesChanged}/>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    ruleset: +state.current.ruleset
});

const mapDispatchToProps =  ({setRuleSet});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConfigurationView);
