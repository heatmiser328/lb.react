'use strict'
var React = require('react-native');
var { View, Text, Image } = React;
var Icons = require('../../../icons');

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

module.exports = ResultsView;
