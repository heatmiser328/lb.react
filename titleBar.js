'use strict';

var React = require('react-native');
var { StyleSheet, ToolbarAndroid, } = React;

var logo = require('image!lb');
var title = 'La Bataille Assistant';

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 64,
      },
});

var TitleBar = React.createClass({
    menuHandler() {
        console.log('menu');
        this.props.onMenu && this.props.onMenu();
    },

    render() {
        return (
            <ToolbarAndroid
                //logo={this.props.logo}
                //navIcon={require('image!ic_menu_black_24dp')}
                navIcon={logo}
                style={styles.toolbar}
                title={title}
                onIconClicked={this.menuHandler}
            />
        );
    },
});

module.exports = TitleBar;
