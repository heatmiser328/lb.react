'use strict'
var React = require('react-native');
var { View, Text, Picker, Image } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');
var DiceRoll = require('../../widgets/diceRoll');
var Icons = require('../../../icons');
var Fire = require('../../core/fire');
var LeaderLoss = require('../../core/leaderloss');

var FireAttackerView = React.createClass({
    getInitialState() {
        return {
            value: this.props.value,
            mod: ''
        };
    },
    onQuickValue(v) {
        return () => {
            console.log(v);
            this.setState({value: v});
            this.props.onChanged && this.props.onChanged();
        }
    },
    onModifier(v) {
        return () => {
            console.log(v);
            this.setState({mod: v});
            this.props.onChanged && this.props.onChanged();
        }
    },

    render() {
        console.log(this.state);
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.state.value} min={1} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        [4,6,9,12,16,18].map((v, i) => {
                            return (
                                <Button
                                    style={{
                                        flex: 1,
                                        width: 16,
                                        height: 32,
                                        padding: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: i == 0 ? 5 : 0,
                                        marginTop: 10,
                                        marginRight: 5,
                                        //backgroundColor: '#3F51B5'
                                    }}
                                    onPress={this.onQuickValue(v)}
                                >
                                    {v.toString()}
                                </Button>
                            );
                        })
                    }
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        ['1/3','1/2','3/2','Cannister'].map((v, i) => {
                            return (
                                <Button
                                    style={{
                                        flex: i != 3 ? 1 : 2,
                                        //width: i != 3 ? 8 : 24,
                                        height: 32,
                                        padding: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: i == 0 ? 5 : 0,
                                        marginTop: 10,
                                        marginRight: 5,
                                        //backgroundColor: '#3F51B5'
                                    }}
                                    onPress={this.onModifier(v)}
                                >
                                    {v}
                                </Button>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
});

var FireDefenderView = React.createClass({
    getInitialState() {
        return {
            value: this.props.value,
            incr: 1
        };
    },
    onQuickValue(v) {
        return () => {
            this.setState({value: v});
            this.props.onChanged && this.props.onChanged();
        }
    },
    onIncrements(v) {
        return () => {
            this.setState({incr: v});
            this.props.onChanged && this.props.onChanged();
        }
    },

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.state.value} min={1} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        [4,6,9,12,14,16].map((v, i) => {
                            return (
                                <Button
                                    style={{
                                        flex: 1,
                                        width: 16,
                                        height: 32,
                                        padding: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: i == 0 ? 5 : 0,
                                        marginTop: 10,
                                        marginRight: 5,
                                        //backgroundColor: '#3F51B5'
                                    }}
                                    onPress={this.onQuickValue(v)}
                                >
                                    {v.toString()}
                                </Button>
                            );
                        })
                    }
                </View>
                <View style={{flex: 1}}>
                    <SpinNumeric label={'Incr'} value={this.state.incr} min={1} onChanged={this.onIncrements} />
                </View>
            </View>
        );
    }
});

var OddsView = React.createClass({
    getInitialState() {
        return {
            value: this.props.value,
            odds: Fire.odds
        };
    },
    onChanged(v) {
        return () => {
            this.setState({value: v});
            this.props.onChanged && this.props.onChanged();
        }
    },
    render() {
        return (
            <View style={{flex:1, flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 16,fontWeight: 'bold', marginTop: 15}}>Odds</Text>
                <Picker style={{flex: 2, marginRight: 25}}
                    selectedValue={this.state.value}
                    onValueChange={(v) => this.setState({value: v})}
                >
                {
                    //this.state.odds.map((o) => {return (<Picker.Item label={o.desc} value={o.value} />);})
                    //this.state.odds.map((o) => {return (<Picker.Item label={'1-1'} value={0} />);})
                    //[{desc: '1-1', value: 1}].map((o) => {return (<Picker.Item label={'1-1'} value={0} />);})
                    this.state.odds.map((o) => {
                        return (<Picker.Item label={o.desc} value={o.value} />);
                    })
                }

                </Picker>
            </View>
        );
    }
});

var ResultsView = React.createClass({
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 2, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.value}</Text>
                </View>
                {this.props.leader
                    ? <Image style={{flex: 1, resizeMode: 'contain'}} source={this.props.leader == 'A' ? Icons.attackerLoss : Icons.defenderLoss} />
                    : <Text />
                }
                {this.props.leader
                    ? (
                        <View style={{flex: 3, alignItems: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{this.props.loss}</Text>
                        </View>
                    ) : <Text />
                }
                {this.props.leader
                    ? <Image style={{flex: 1, resizeMode: 'contain'}} source={this.props.mortal ? Icons.mortal : Icons.wounded} />
                    : <Text />
                }
            </View>
        );
    }
});

var DiceModifiersView = React.createClass({
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {
                ['-6','-3','-1','+1','+3','+6'].map((v, i) => {
                    return (
                        <Button
                            style={{
                                flex: 1,
                                //width: 16,
                                height: 48,
                                padding: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: i == 0 ? 5 : 0,
                                marginTop: 10,
                                marginRight: 5,
                                //backgroundColor: '#3F51B5'
                            }}
                            onPress={this.props.onChange && this.props.onChange(v)}
                        >
                            {v}
                        </Button>
                    )
                })
            }
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
            incr: 1,
            odds: Fire.defaultOdds.value,
            results: {}
        };
    },
    onResolve(e) {
        console.log('fire: resolve');
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1, marginTop: 5}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FireAttackerView value={this.state.attack} />
                    </View>
                    <View style={{flex: 1}}>
                        <FireDefenderView value={this.state.defend} />
                    </View>
                </View>
                <View style={{flex: .5, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <OddsView value={this.state.odds} />
                    </View>
                    <View style={{flex: 3}}>
                        <ResultsView value={this.state.results.result} leader={this.state.results.leader} loss={this.state.results.loss} mortal={this.state.results.mortal} />
                    </View>
                </View>
                <View style={{flex: .75}}>
                    <DiceRoll dice={this.state.dice} onRoll={this.onResolve} onDie={this.onResolve}/>
                </View>
                <View style={{flex: 3}}>
                    <DiceModifiersView />
                </View>
            </View>
        );
    }
});

module.exports = FireView;
