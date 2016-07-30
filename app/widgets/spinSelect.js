'use strict'

var React = require('react-native');
var { View, Text, StyleSheet } = React;
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
      alignItems: 'center',
      //justifyContent: 'center',
      //backgroundColor: '#DCDCDC',
      padding: 5,
  },
  value: {
      fontSize: 18,
  },
});

var SpinSelect = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  onPrev() {
      //console.log('spin: previous');
      this.props.onPrev && this.props.onPrev();
  },
  onNext() {
      //console.log('spin: next');
      this.props.onNext && this.props.onNext();
  },
  render() {
    //console.log(this.props);
    //console.log('SpinSelect: ' + this.props.value);
    return (
      <View style={styles.container}>
        <SpinButton style={styles.button} direction={'prev'} onPress={this.onPrev} />
        <View style={styles.valueContainer}>
            <Text style={styles.value} >
                {this.props.value}
            </Text>
        </View>
        <SpinButton style={styles.button} direction={'next'} onPress={this.onNext} />
      </View>
    );
  }
});

module.exports = SpinSelect;
