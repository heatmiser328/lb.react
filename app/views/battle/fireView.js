'use strict'
var React = require('react-native');
var { View, Text, Picker, Image } = React;
var Button = require('apsl-react-native-button');
var SpinNumeric = require('../../widgets/spinNumeric');
var DiceRoll = require('../../widgets/diceRoll');
var Icons = require('../../../icons');
var Fire = require('../../core/fire');
var LeaderLoss = require('../../core/leaderloss');
var Base6 = require('../../core/base6');

var dice = [
    {num: 1, low: 1, high: 6, color: 'red'},
    {num: 1, low: 1, high: 6, color: 'white'},
    {num: 1, low: 1, high: 6, color: 'blue'},
    {num: 1, low: 1, high: 6, color: 'blackw'},
    {num: 1, low: 1, high: 6, color: 'blackr'}
];

var FireAttackerView = React.createClass({
    onQuickValue(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v);
        }
    },
    onModifier(v) {
        return () => {
            this.props.onModifierChanged && this.props.onModifierChanged(v);
        }
    },

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Attacker</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={1} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        [4,6,9,12,16,18].map((v, i) => {
                            return (
                                <Button key={i}
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
                                        //color: 'red',
                                        backgroundColor: 'lightgray'
                                        //backgroundColor: '#3F51B5'
                                    }}
                                    textStyle={{
                                        color: 'black'
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
                                <Button key={i}
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
                                        backgroundColor: 'lightgray'
                                        //backgroundColor: '#3F51B5'
                                    }}
                                    textStyle={{
                                        color: 'black'
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
    onQuickValue(v) {
        return () => {
            this.props.onChanged && this.props.onChanged(v);
        }
    },
    onIncrements(v) {
        return () => {
            this.props.onIncrementsChanged && this.props.onIncrementsChanged(v);
        }
    },

    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: 18,fontWeight: 'bold',textAlign: 'center'}}>Defender</Text>
                <View style={{flex: 1}}>
                    <SpinNumeric value={this.props.value} min={1} onChanged={this.props.onChanged} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {
                        [4,6,9,12,14,16].map((v, i) => {
                            return (
                                <Button key={i}
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
                                        backgroundColor: 'lightgray'
                                        //backgroundColor: '#3F51B5'
                                    }}
                                    textStyle={{
                                        color: 'black'
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
                    <SpinNumeric label={'Incr'} value={this.props.incr} min={1} onChanged={this.onIncrements} />
                </View>
            </View>
        );
    }
});

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
                    {Fire.odds.map((o,i) => {return (<Picker.Item key={i} label={o} value={o} />);})}
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
    onModifier(v) {
        return () => {
            this.props.onChange && this.props.onChange(+v);
        }
    },
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {
                ['-6','-3','-1','+1','+3','+6'].map((v, i) => {
                    return (
                        <Button key={i}
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
                                backgroundColor: 'blue'
                                //backgroundColor: '#3F51B5'
                            }}
                            textStyle={{
                                color: 'white'
                            }}
                            onPress={this.onModifier(v)}
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
            attack: 1,
            defend: 1,
            incr: 1,
            odds: Fire.defaultOdds,
            cannister: false,
            die1: 1,
            die2: 1,
            die3: 1,
            die4: 1,
            die5: 1,
            result: '',
            leader: '',
            loss: '',
            mortal: false
        };
    },
    onAttackerChanged(v) {
        this.setState({attack: v});
        this.onResolve();
    },
    onAttackerModifierChanged(v, s) {
        /*
        var a = this.state.attack;
        if (v == 'Cannister') {
            this.setState({cannister})
        }
        */
        this.onResolve();
    },
    onDefenderChanged(v) {
        this.setState({defend: v});
        this.onResolve();
    },
    onDefenderIncrementsChanged(v) {
        this.setState({incr: v});
        this.onResolve();
    },
    onOddsChanged(v) {
        this.setState({odds: v});
        this.onResolve();
    },
    onDiceModifierChanged(v) {
        var m = +v;
        var d = (this.state.die1 * 10) + this.state.die2;
        d = Base6.add(d, m);
        var d1 = Math.floor(d / 10);
        var d2 = d % 10;
        //console.log(d + ' = ' + d1 + ' + ' + d2);
        this.setState({
            die1: Math.floor(d / 10),
            die2: d % 10
        });
        this.onResolve();
    },
    onDieChanged(d,v) {
        console.log(d + ' = ' + v);
        let state = {};
        state['die'+d] = v;
        this.setState(state);
        this.onResolve();
    },
    onDiceRoll(d) {
        console.log(d);
        this.setState({die1: d[0].value,die2: d[1].value, die3: d[2].value, die4: d[3].value, die5: d[4].value});
        this.onResolve();
    },
    onResolve(e) {
        console.log('fire: resolve');
        // calc odds
        var odds = Fire.calculate(this.state.attack,  this.state.defend, this.state.cannister);
        // resolve fire
		var fireDice = (this.state.die1*10) + this.state.die2;
		var lossdie = this.state.die3;
		var durationdie1 = this.state.die4;
		var durationdie2 = this.state.die5;
		var results = Fire.resolve(odds, fireDice, this.state.incr);
		var lloss = LeaderLoss.resolve(fireDice, lossdie, durationdie1, durationdie2) || {};
        this.setState({
            odds: odds,
            result: results,
            leader: lloss.leader,
            loss: lloss.result,
            mortal: lloss.mortal
        });
    },
    render() {
        //console.log(this.props);
        return (
            <View style={{flex: 1, marginTop: 5}}>
                <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <FireAttackerView value={this.state.attack} onChanged={this.onAttackerChanged} onModifierChanged={this.onAttackerModifierChanged} />
                    </View>
                    <View style={{flex: 1}}>
    					<FireDefenderView value={this.state.defend} incr={this.state.incr} onChanged={this.onDefenderChanged} onIncrementsChanged={this.onDefenderIncrementsChanged} />
    				</View>
                </View>
                <View style={{flex: .5, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <OddsView value={this.state.odds} onChanged={this.onOddsChanged} />
                    </View>
                    <View style={{flex: 3}}>
                        <ResultsView value={this.state.result} leader={this.state.leader} loss={this.state.loss} mortal={this.state.mortal} />
                    </View>
                </View>
                <View style={{flex: .75}}>
                    <DiceRoll dice={dice} values={[this.state.die1,this.state.die2,this.state.die3,this.state.die4,this.state.die5]}
                            onRoll={this.onDiceRoll} onDie={this.onDieChanged}/>
                </View>
                <View style={{flex: 3}}>
                    <DiceModifiersView onChange={this.onDiceModifierChanged} />
                </View>
            </View>
        );
    }
});

module.exports = FireView;
