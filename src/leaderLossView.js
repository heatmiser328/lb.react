'use strict'
var React = require('react');
import { View, Text, Image } from 'react-native';
var Icons = require('./res/icons');

var LeaderLossView = React.createClass({
    render() {
        let lossIcon = (this.props.loss || '').toLowerCase() == 'capture'
            ? Icons.capture
            : (this.props.mortal ? Icons.mortal : Icons.wounded);
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
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
                    ? <Image style={{flex: 1, resizeMode: 'contain'}} source={lossIcon} />
                    : <Text />
                }
            </View>
        );
    }
});

module.exports = LeaderLossView;
