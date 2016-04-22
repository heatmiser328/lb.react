'use strict';

var React = require('react-native');
var { StyleSheet, ToolbarAndroid, } = React;
var Icons = require('../../icons');

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 64,
      },
});

var TitleBar = React.createClass({
    getInitialState() {
        let state = {actions: []};
        if (this.props.onRefresh) {
          state.actions.push({
            title: 'refresh',
            icon: Icons.refreshButton,
            show: 'always'
          });
        }
        if (this.props.onAbout) {
            state.actions.push({
              title: 'about',
              icon: Icons.info,
              show: 'always'
            });
        }

        return state;
    },
    menuHandler() {
        //console.log('menu');
        this.props.onMenu && this.props.onMenu();
    },
    onActionSelected(position) {
        console.log(arguments);
        let action = this.state.actions[position];
        if (action) {
            if (action.title == 'refresh') {
                this.props.onRefresh && this.props.onRefresh();
            } else if (action.title == 'about') {
                this.props.onAbout && this.props.onAbout();
            }
        }
    },

    render() {
        return (
            <ToolbarAndroid
                navIcon={Icons.menu}
                style={styles.toolbar}
                title={this.props.title}
                subtitle={this.props.subtitle}
                subtitleColor='blue'
                onIconClicked={this.menuHandler}
                actions={this.state.actions}
                onActionSelected={this.onActionSelected}
            />
        );
    },
});

module.exports = TitleBar;
