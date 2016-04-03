'use strict'
var React = require('react-native');
var { View, Text, Picker } = React;

var OddsView = React.createClass({
    onChanged(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v);
        }
    },
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 16,fontWeight: 'bold', marginLeft: 5, marginTop: 15}}>Odds</Text>
                <Picker style={{flex: 2, marginRight: 25}}
                    selectedValue={this.props.value}
                    onValueChange={this.onChanged}
                >
                    {this.props.odds.map((o,i) => {return (<Picker.Item key={i} label={o} value={o} />);})}
                </Picker>
            </View>
        );
    }
});

module.exports = OddsView;
