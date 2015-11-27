'use strict'

var React = require('react-native');
var { View, TextInput, Text, StyleSheet } = React;
var SpinButton = require('./spinButton');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    //backgroundColor: 'blue',
  },
  button: {
      width: 50,
  },
  valueContainer: {
      flex: 90,
      width: 100,
      alignItems: 'center',
      //justifyContent: 'center',
      //backgroundColor: '#DCDCDC',
      padding: 5,
  },
  value: {
      justifyContent: 'center',
      fontSize: 18,
      backgroundColor: '#DCDCDC',
  },
  input: {
    flex: 1,
    padding: 4,
    marginRight: 1,
    marginTop: 5,
    fontSize: 18,    
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#E6E5ED',
    backgroundColor: '#F8F8F9',
    justifyContent: 'center',
    height: 50
  }
});

var SpinNumeric = React.createClass({
  getInitialState() {
    return {
      value: this.props.value,
      text: 'wth?'
    };
  },
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
        let v = this.nextValue(+this.state.value, true);
        this.setState({value: v});
        this.props.onChanged && this.props.onChanged(v);
      } catch(err) {
        console.error(err);
      }
  },
  onNext() {
    console.log('spin: next');
    try {
      let v = this.nextValue(+this.state.value);
      this.setState({value: v});
      this.props.onChanged && this.props.onChanged(v);
    } catch(err) {
      console.error(err);
    }
  },
  onChanged(e) {
    console.log('spin: changed');
    try {
      let v = +e;
      this.setState({value: v});
      this.props.onChanged && this.props.onChanged(v);
    } catch(err) {
      console.error(err);
    }
  },
  render() {
    //console.log(this.props);
    console.log('SpinNumeric: ' + this.state.value);
    return (
      <View style={styles.container}>
        <SpinButton style={styles.button} direction={'prev'} onPress={this.onPrev} />
        <View style={styles.valueContainer}>
            <TextInput style={styles.input}
              keyboardType={'numeric'}
              autoCorrect={false}
              defaultValue={(this.props.defaultValue || 1).toString()}
              onChangeText={this.onChanged}
              value={this.state.value.toString()}
            >
            </TextInput>
        </View>
        <SpinButton style={styles.button} direction={'next'} onPress={this.onNext} />
      </View>
    );
  }
});

module.exports = SpinNumeric;
