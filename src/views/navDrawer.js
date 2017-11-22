import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {NavDrawer} from 'react-native-nub';
import PublisherNavMenuItem from './navDrawerMenuItemPublisher';
import Icons from '../res';
import Battles from '../services/battles';
import {reset} from '../actions/current';

let NavigationDrawer = React.createClass({    
    onSelect(e) {
        this.props.reset(e);
        let s = Battles.scenario(e.scenario.id);
        Actions.battle({title: s.name, subtitle: s.scenario.name});
    },    
    render () {
        return (            
            <NavDrawer menuItem={PublisherNavMenuItem} items={Battles.battlesByPublisher()} icons={Icons} onSelect={this.onSelect} >
                {this.props.children}
            </NavDrawer>                
        );
    }
});

module.exports = connect(null,{reset})(NavigationDrawer);
