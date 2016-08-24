'use strict';

var React = require('react');
import { View, Text, Navigator } from 'react-native';
var DrawerLayout = require('./widgets/drawerLayout');
var NavMenu = require('./widgets/navMenu');
var BattleNavMenuItem = require('./battleNavMenuItem');
var TitleBar = require('./widgets/titleBar');
import { MenuContext } from 'react-native-menu';
var EventEmitter = require('EventEmitter');
var LandingView = require('./landingView');
var AboutView = require('./aboutView');
var BattleView = require('./battleView');
var Battles = require('./services/battles');
var Current = require('./services/current');
var log = require('./services/log');

var MainView = React.createClass({
    getInitialState() {
        return {
            drawer: false,
            routes: {
                landing: {index: 0, name: 'landing', onMenu: this.navMenuHandler},
                battle: {index: 1, name: 'battle', title: 'Battle', onMenu: this.navMenuHandler, onRefresh: this.onReset, onInfo: this.onAbout},
                about: {index: 7, name: 'about', title: 'About'}
            },
            version: '0.0.1'
        };
    },
    fetchBattle() {
        Current.load()
        //new Promise((a,r)=> a())
        .then((data) => {
            if (data) {
                this.state.routes.battle.data = Battles.scenario(data.scenario);
                log.debug('current battle ' + this.state.routes.battle.data.name);
                this.refs.navigator.resetTo(this.state.routes.battle);
            } else {
                log.debug('mainView: no current game');
            }
        })
        .done();
    },
    componentWillMount() {
        this.eventEmitter = new EventEmitter();
        this.state.initialRoute = this.state.routes.landing;
        this.fetchBattle();
    },
    componentWillUnmount() {
    },
    toggleDrawer() {
        if (!this.state.drawer) {
            let open = this.refs.drawer.openDrawer || this.refs.drawer.open;
            open();
        } else {
            let close = this.refs.drawer.closeDrawer || this.refs.drawer.close;
            close();
        }
        this.state.drawer = !this.state.drawer;
    },
    menuHandler() {
        this.toggleDrawer();
    },
    navMenuHandler(e, id) {
        //log.debug(e);
        if (e == 'About') {
            this.refs.navigator.push(this.state.routes.about);
        }
        else if (e == 'battle') {
            this.state.routes.battle.data = Battles.scenario(id);
            Current.reset(this.state.routes.battle.data)
            .then(() => {
                this.eventEmitter.emit('reset');
                this.refs.navigator.resetTo(this.state.routes.battle);
            });
        }
        this.toggleDrawer();
    },
    onChangeRoute(route, data) {
        if (this.state.routes[route]) {
            this.state.routes[route].data = data;
            this.refs.navigator.push(this.state.routes[route]);
        }
    },
    onReset() {
        log.debug('reset game');
        this.eventEmitter.emit('menureset');
    },
    onAbout() {
        this.refs.navigator.push(this.state.routes.about);
    },
    renderScene(route, navigator) {
        route = route || {};
        log.debug('render scene ' + route.name);
        if (route.name == 'landing') {
            return (
                <LandingView events={this.eventEmitter} />
            );
        }

        if (route.name == 'battle') {
            console.log(route.data);
            this.state.routes.battle.title = route.data.name;
            this.state.routes.battle.subtitle = route.data.scenario.name;
            return (
                <BattleView battle={route.data} events={this.eventEmitter} />
            );
        }

        if (route.name == 'about') {
            return (
                <AboutView version={this.state.version} events={this.eventEmitter} onClose={() => {navigator.pop();}} />
            );
        }

        return (
            <LandingView events={this.eventEmitter} />
        );
    },
    render() {
        return (
            <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.01)'}}>
                <DrawerLayout
                    ref="drawer"
                    onDrawerClosed={() => {this.state.drawer = false;} }
                    onDrawerOpened={() => {this.state.drawer = true;} }
                    onDrawerSlide={(e) => this.setState({drawerSlideOutput: JSON.stringify(e.nativeEvent)})}
                    onDrawerStateChanged={(e) => this.setState({drawerStateChangedOutput: JSON.stringify(e)})}
                    drawerWidth={300}
                    renderNavigationView={() => <NavMenu items={Battles.battles.map((b,i) => {
                            return (
                                <BattleNavMenuItem key={i+1} battle={b} onPress={this.navMenuHandler} />
                            );
                        })} /> }>
                    <MenuContext style={{flex: 1}}>
                        <Navigator
                            ref="navigator"
                            debugOverlay={false}
                            initialRoute={this.state.initialRoute}
                            renderScene={this.renderScene}
                            navigationBar={<Navigator.NavigationBar style={{backgroundColor: 'blue'}} routeMapper={TitleBar()} />}
                        />
                    </MenuContext>
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
