'use strict'

var React = require('react-native');
var { View, TextInput, Text } = React;
var SpinButton = require('./spinButton');

var SpinNumeric = React.createClass({
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    },
    nextValue(value, neg) {
        let values = this.props.values;
        if (!values || values.length < 1) {
            let v = neg ? value - 1 : value + 1;
            if (this.props.min && v < this.props.min) {
                v = this.props.min;
            } else if (this.props.max && v > this.props.max) {
                v = this.props.max;
            }
            return v;
        }
        if (neg)  {
            for (var i=values.length; i>=0; i--) {
                if (values[i] <= value) {
                    return values[i];
                }
            }
            return values[0];
        }

        for (var i=0; i<values.length; i++) {
            if (values[i] >= value) {
                return values[i];
            }
        }
        return values[values.length-1];
    },
    onPrev() {
        console.log('spin: previous');
        try {
            let v = this.nextValue(+this.props.value, true);
            this.props.onChanged && this.props.onChanged(v);
        } catch(err) {
            console.error(err);
        }
    },
    onNext() {
        console.log('spin: next');
        try {
            let v = this.nextValue(+this.props.value);
            this.props.onChanged && this.props.onChanged(v);
        } catch(err) {
            console.error(err);
        }
    },
    onChanged(e) {
        console.log('spin: changed = ' + e);
        try {
            let v = +e;
            this.props.onChanged && this.props.onChanged(v);
        } catch(err) {
            console.error(err);
        }
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 0.1,flexDirection: 'row',paddingTop: 5,paddingBottom: 5}}>
                <Text style={{marginTop: 10}}>{this.props.label || ''}</Text>
                <SpinButton style={{width: 50}} direction={'prev'} onPress={this.onPrev} />
                <View style={{flex: 90,width: 100,height: 50,alignItems: 'center',padding: 5}}>
                <TextInput
                    style={{flex: 1,padding: 4,marginRight: 1,fontSize: 18,borderWidth: 1,borderRadius: 4,
                            borderColor: '#E6E5ED',backgroundColor: '#F8F8F9',justifyContent: 'center',textAlign: 'center'}}
                    keyboardType={'numeric'}
                    autoCorrect={false}
                    defaultValue={(this.props.defaultValue || '').toString()}
                    onChangeText={this.onChanged}
                    value={(this.props.value || '').toString()}
                >
                    </TextInput>
                </View>
                <SpinButton style={{width: 50}} direction={'next'} onPress={this.onNext} />
            </View>
        );
    }
});

module.exports = SpinNumeric;
