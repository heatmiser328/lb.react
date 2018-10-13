import React from 'react';
import { View, Text, Picker } from 'react-native';
import Style from '../../services/style';

var OddsView = React.createClass({
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={{fontSize: Style.Font.mediumlarge(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                <Picker style={{flex: 1, justifyContent:'center', alignItems:'center'}}
                    itemStyle={{fontSize:Style.Font.large()}}
                    selectedValue={this.props.value}
                    onValueChange={this.props.onChanged}
                >
                    {this.props.odds.map((o,i) => (<Picker.Item key={i} label={o} value={o} />))}
                </Picker>
            </View>
        );
    }
});

module.exports = OddsView;
