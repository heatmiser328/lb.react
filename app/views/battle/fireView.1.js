'use strict'

var React = require('react-native');
var { View, Picker, Text, StyleSheet } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');
var DiceRoll = require('../../widgets/diceRoll');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },

  fireContainer: {
    flex: 1,
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  fireHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20
  },
  quickValueButton: {
      flex: 1,
      width: 16,
      height: 32,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginRight: 5,
      //backgroundColor: '#3F51B5'
  },


});

var FireAttacker = React.createClass({
    getInitialState() {
        return {
            value: this.props.value
        };
    },
    onValue(v) {
        return () => {
            this.setState({value: v});
            this.props.onChanged && this.props.onChanged();
        }
    },

    render() {
        return (
        <View style={styles.fireContainer}>
            <Text style={styles.fireHeader}>Attacker</Text>
            <SpinNumeric value={this.state.value} min={1} onChanged={this.props.onChanged} />
            <View style={{flex: 0.1, flexDirection: 'row', marginTop: 5, backgroundColor: 'red', justifyContent: 'center'}}>
                <Button style={[styles.quickValueButton, {marginLeft: 5}]} onPress={this.onValue(4)}>4</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(6)}>6</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(9)}>9</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(12)}>12</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(16)}>16</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(18)}>18</Button>
            </View>
            <View style={{flex: 0.1, flexDirection: 'row', marginTop: 10, backgroundColor: 'blue'}}>
                <Button style={[styles.quickValueButton, {marginLeft: 5}]} onPress={this.onValue(4)}>1/3</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(6)}>1/2</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(9)}>3/2</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(12)}>Cannister</Button>
            </View>
            <View style={{flex: 0.1}} />
        </View>
        );
    }
});

var FireDefender = React.createClass({
    getInitialState() {
        return {
            value: this.props.value
        };
    },
    onValue(v) {
        return () => {
            this.setState({value: v});
            this.props.onChanged && this.props.onChanged();
        }
    },

    render() {
        return (
          <View style={styles.fireContainer}>
            <Text style={styles.fireHeader}>Defender</Text>
            <SpinNumeric value={this.state.value} min={1} onChanged={this.props.onChanged} />
            <View style={{flex: 0.1, flexDirection: 'row', marginTop: 5, backgroundColor: 'red', justifyContent: 'center'}}>
                <Button style={[styles.quickValueButton, {marginLeft: 5}]} onPress={this.onValue(4)}>4</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(6)}>6</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(9)}>9</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(12)}>12</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(16)}>16</Button>
                <Button style={styles.quickValueButton} onPress={this.onValue(18)}>18</Button>
            </View>
            <SpinNumeric value={this.state.value} min={1} onChanged={this.props.onChanged} />
            <View style={{flex: .1}} />
          </View>
      );
    }
});

var Odds = React.createClass({
    getInitialState() {
        return {
            odds: '1'
        };
    },
    render() {
        return (
      <View style={{flex: .25, flexDirection: 'row', backgroundColor: 'blue'}}>
        <Text style={[styles.label, {flex: .25}]}>Odds</Text>
        <Picker style={{flex: .75, marginRight: 25, marginTop: 8}}
            selectedValue={this.state.odds}
            onValueChange={(v) => this.setState({odds: v})}>
            <Picker.Item label="1-2" value="-1" />
            <Picker.Item label="1-1" value="1" />
            <Picker.Item label="1.5-1" value="1.5" />
            <Picker.Item label="2-1" value="2" />
            <Picker.Item label="2.5-1" value="2.5" />
        </Picker>
      </View>
        );
    }
});

var Results = React.createClass({
  render() {
    return (
      <View style={{flex: .75, backgroundColor: 'red'}}>
        <Text style={styles.label}>Results</Text>
      </View>
    );
  }
});

var DiceModifiers = React.createClass({
  render() {
    return (
      <View>
        <Text style={styles.label}>Dice Modifiers</Text>
      </View>
    );
  }
});

var FireView = React.createClass({
  getInitialState() {
      return {
          dice: [
              {num: 1, low: 1, high: 6, color: 'red'},
              {num: 1, low: 1, high: 6, color: 'white'},
              {num: 1, low: 1, high: 6, color: 'blue'},
              {num: 1, low: 1, high: 6, color: 'blackw'},
              {num: 1, low: 1, high: 6, color: 'blackr'}
          ],
          attack: 1,
          defend: 1,
      };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  onResolve(e) {
      console.log('fire: resolve');
  },
  render() {
    //console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <FireAttacker style={styles.attacker} value={this.state.attack} />
          <FireDefender style={styles.defender} value={this.state.defend} />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Odds />
          <Results />
        </View>
        <DiceRoll dice={this.state.dice} onRoll={this.onResolve} onDie={this.onResolve}/>
        <DiceModifiers />
      </View>
    );
  }
});

module.exports = FireView;
