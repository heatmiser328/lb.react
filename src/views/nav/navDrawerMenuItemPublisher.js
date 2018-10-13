import React from 'react';
import { View, TouchableOpacity, Text, Image, ListView } from 'react-native';
import {Arrow} from 'react-native-nub';
import Style from '../../services/style';
import BattleNavMenuItem from './navDrawerMenuItemBattle';

var PublisherNavMenuItem = React.createClass({
    getInitialState() {
        return {expanded: false};
    },
    onPress() {
        this.setState({expanded: !this.state.expanded});
    },
    render() {
        let publisher = this.props.publisher || this.props.item || {};
        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>            
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={this.onPress}>                
                        <View style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            flex: 1,
                            flexDirection: 'row',
                            margin: 5,
                            padding: 5,
                            backgroundColor: 'lightgray',//#eaeaea',
                            borderRadius: 3
                        }}>
                            <View style={{marginTop: 40, marginRight: 5}}>
                                <Arrow size={18} direction={this.state.expanded ? 'down' : 'right'} />
                            </View>
                            <Image style={{
                                width: 64,
                                height: 96,
                                resizeMode: 'contain',
                            }} source={this.props.icons[publisher.image]} />
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: Style.Font.large(),textAlign: 'center',margin: 10}}>{publisher.name}</Text>
                            </View>
                        </View>                                        
                    </TouchableOpacity>
                </View>
                {this.renderBattles(publisher)}
            </View>
        );
    },
    renderBattles(publisher) {
        if (this.state.expanded) {
            return (
                <View>
                    {publisher.battles.map((battle,i) => {
                        return (
                            <BattleNavMenuItem key={i}
                                icons={this.props.icons}
                                battle={battle}
                                onPress={this.props.onPress}
                                />
                        );
                    })}                    
                </View>
            );
        }
        return null;                    
    }
});

module.exports = PublisherNavMenuItem;
