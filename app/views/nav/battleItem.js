'use strict';

var React = require('react-native');
var { View, TouchableOpacity, Text, Image, ListView } = React;
var ScenarioItem = require('./scenarioItem');
var icons = require('../../../icons');
var moment = require('moment');

var BattleItem = React.createClass({
    getInitialState() {
        return {expanded: false};
    },
    onPress() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //console.log('render ' + this.props.name + ' with ' + this.props.scenarios.length + ' scenarios');
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={{flex: 1,backgroundColor: '#fff'}}>
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                        backgroundColor: '#eaeaea',
                        borderRadius: 3
                    }}>
                        <Image style={{width: 28, height: 96, resizeMode: 'contain'}}
                            source={this.state.expanded ? icons['arrowDown'] : icons['arrowRight']} />
                        <Image style={{
                            //flex: 1,
                            //width: null,
                            //height: null,
                            width: 64,
                            height: 96,
                            resizeMode: 'contain',
                            //backgroundColor: 'transparent',
                        }} source={icons[this.props.image]} />
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 20,textAlign: 'center',margin: 10}}>{this.props.name}</Text>
                            <Text style={{fontSize: 15,textAlign: 'center',margin: 10,color: 'blue'}}>{this.props.publisher}</Text>
                        </View>
                    </View>
                    {this.state.expanded
                        ? <ListView dataSource={ds.cloneWithRows(this.props.scenarios)}
                            renderRow={(scenario) => {
                                //console.log('render ' + scenario.name);
                                return (
                                    <ScenarioItem name={scenario.name}
                                        start={new Date(scenario.start.year, scenario.start.month, scenario.start.day, scenario.start.hour, scenario.start.minute)}
                                        end={new Date(scenario.end.year, scenario.end.month, scenario.end.day, scenario.end.hour, scenario.end.minute)}
                                        scenarioid={scenario.id}
                                        onSelected={this.props.onSelected}
                                     />
                                );
                            }}
                         />
                        : <Text/>
                    }
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = BattleItem;
