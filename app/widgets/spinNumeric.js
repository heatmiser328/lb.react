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
            if (this.props.hasOwnProperty('min') && v < this.props.min) {
                v = this.props.min;
            } else if (this.props.hasOwnProperty('max') && v > this.props.max) {
                v = this.props.max;
            }
            return v;
        }

        var i = values.findIndex((v) => {return v==value;}) + (neg ? -1 : 1);
        if (i < 0) {
            i = 0;
        } else if (i >= values.length) {
            i = values.length - 1;
        }
        return values[i];
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
        let d = (this.props.hasOwnProperty('defaultValue') ? this.props.defaultValue : 1);
        let v = (this.props.hasOwnProperty('value') ? this.props.value : 1);
        if (this.props.integer) {
            d = Math.floor(d).toString();
            v = Math.floor(v).toString();
        } else {
            d = d.toFixed(1);
            v = v.toFixed(1);
        }
        return (
            <View style={{flex: 1,flexDirection: 'row',paddingTop: 5,paddingBottom: 5}}>
                {this.props.label
                    ? <Text style={{flex: 10,width:100,marginTop: 10}}>{this.props.label}</Text>
                    : null
                }
                <SpinButton style={{flex: 10, width: 50}} direction={'prev'} onPress={this.onPrev} />
                <View style={{flex: 60,height: 50,alignItems: 'center',padding: 5}}>
                    <TextInput
                        style={{flex: 1, width: 100, fontSize: 18,borderWidth: 1,borderRadius: 4,
                                borderColor: '#E6E5ED',backgroundColor: '#F8F8F9',justifyContent: 'center',textAlign: 'center'}}
                        keyboardType={'numeric'}
                        autoCorrect={false}
                        onChangeText={this.onChanged}
                        defaultValue={d}
                        value={v}
                    />
                </View>
                <SpinButton style={{flex: 10, width: 50}} direction={'next'} onPress={this.onNext} />
            </View>
        );
    }
});

module.exports = SpinNumeric;
