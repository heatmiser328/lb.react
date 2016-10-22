'use strict'
var React = require('react');
import { View, Text, Picker } from 'react-native';

var OddsView = React.createClass({
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                <Picker style={{flex: 1, justifyContent:'center'}}
                    selectedValue={this.props.value}
                    onValueChange={this.props.onChanged}
                >
                    {this.props.odds.map((o,i) => {return (<Picker.Item key={i} label={o} value={o} />);})}
                </Picker>
            </View>
        );
    }
});

module.exports = OddsView;
