import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Landing} from 'react-native-nub';
import {splash} from '../res';
import {load} from '../actions/current';

var HomeView = React.createClass({
    componentWillMount() {
        this.props.load()
        .then((game) => {
            if (game && game.name) {
                Actions.battle({title: game.name, subtitle: game.scenario.name});                
            }            
        })
        .done();
    },    
    render() {
        return (
            <Landing splash={splash} />
        );
    }
});

const mapDispatchToProps =  ({load});

module.exports = connect(
  null,
  mapDispatchToProps
)(HomeView);

