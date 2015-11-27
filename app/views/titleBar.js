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
    menuHandler() {
        //console.log('menu');
        this.props.onMenu && this.props.onMenu();
    },
    onActionSelected(position) {
      this.props.onRefresh && this.props.onRefresh();
    },

    render() {
        let actions = [];
        if (this.props.onRefresh) {
          actions.push({
            title: 'refresh',
            icon: Icons.refreshButton,
            show: 'always'
          });
        }
        //console.log(actions);
        return (
            <ToolbarAndroid
                //logo={this.props.logo}
                //navIcon={require('image!ic_menu_black_24dp')}
                navIcon={this.props.logo}
                style={styles.toolbar}
                title={this.props.title}
                subtitle={this.props.subtitle}
                subtitleColor='blue'
                onIconClicked={this.menuHandler}
                actions={actions}
                onActionSelected={this.onActionSelected}
            />
        );
    },
});

module.exports = TitleBar;
