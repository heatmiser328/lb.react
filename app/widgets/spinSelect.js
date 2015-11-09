'use strict'

var React = require('react-native');
var { View, Text, TouchableOpacity, Image, StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    //backgroundColor: 'blue',
  },
  prevButton: {
      flex: 10,
      padding: 5,
      //backgroundColor: 'red',
      alignItems: 'center',
  },
  nextButton: {
      flex: 10,
      padding: 5,
      //backgroundColor: 'red',
      alignItems: 'center',
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

var SpinButton = React.createClass({
    render() {
        let style = this.props.direction == 'prev' ? styles.prevButton : styles.nextButton;
        let icon = this.props.direction == 'prev' ? require('image!ic_action_previous_item') : require('image!ic_action_next_item');
        return (
            <TouchableOpacity onPress={this.props.onPress} style={style}>
                <Image source={icon} />
            </TouchableOpacity>
        );
    }
});

var SpinSelect = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },
  onPrev() {
      console.log('spin: previous');
      this.props.onPrev && this.props.onPrev();
  },
  onNext() {
      console.log('spin: next');
      this.props.onNext && this.props.onNext();
  },
  render() {
    //console.log(this.props);
    console.log('SpinSelect: ' + this.props.value);
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
