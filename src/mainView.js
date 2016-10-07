'use strict';

var React = require('react');
import { View, Text, Navigator } from 'react-native';
import {DrawerLayout, NavMenu, TitleBar, LandingView, AboutView, Log} from 'app-nub.react';
var BattleNavMenuItem = require('./battleNavMenuItem');
import { MenuContext } from 'react-native-menu';
var EventEmitter = require('EventEmitter');
var Icons = require('./res/icons');
var BattleView = require('./battleView');
var Battles = require('./services/battles');
var Current = require('./services/current');
var log = Log;

var MainView = React.createClass({
    getInitialState() {
        return {
            drawer: false,
            routes: {
                landing: {index: 0, name: 'landing', onMenu: this.navMenuHandler},
                battle: {index: 1, name: 'battle', title: 'Battle', onMenu: this.navMenuHandler, onRefresh: this.onReset, onInfo: this.onAbout},
                about: {index: 7, name: 'about', title: 'About'}
            },
            version: '1.2.0'
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
        if (route.name == 'battle') {
            this.state.routes.battle.title = route.data.name;
            this.state.routes.battle.subtitle = route.data.scenario.name;
            return (
                <BattleView battle={route.data} events={this.eventEmitter} />
            );
        }

        if (route.name == 'about') {
            return (
                <AboutView logo={Icons.logo}
                    title={'About La Bataille Assistant'}
                    version={this.state.version}
                    releasedate={'October 6, 2016'}
                    description={'A no frills assistant for the La Bataille conglomeration of wargames.'}
                    credit={{
                        description: 'All glory to them that made it possible!',
                        links: [
                            {label: 'Marshal Enterprises', url: 'http://www.labataille.me/Home_Page.php'},
                            {label: 'Clash of Arms', url: 'http://www.clashofarms.com/'}
                        ]
                    }}
                    additionalinfo={{
                        description: 'And of course check out the discussions and extras',
                        links: [
                            {label: 'ConsimWorld Forum', url: 'http://talk.consimworld.com/WebX?13@@.ee6c73b/31887'},
                            {label: 'La Bataille Extras', url: 'http://labataille.us/'}
                        ]
                    }}
                    dependencies={[
                        {description: 'apsl-react-native-button', url: ''},
                        {description: 'react-native-scrollable-tab-view', url: ''},
                        {description: 'react-native-audioplayer', url: ''},
                        {description: 'react-native-fs', url: ''},
                        {description: 'react-native-menu', url: ''},
                        {description: 'moment', url: ''}
                    ]}
                    events={this.eventEmitter} onClose={() => {navigator.pop();}}
                />
            );
        }

        return (
            <LandingView top={30} splash={Icons.splash} events={this.eventEmitter} />
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
                            navigationBar={<Navigator.NavigationBar style={{backgroundColor: 'blue'}} routeMapper={TitleBar({menu: Icons.menu, refresh: Icons.refresh, info: Icons.info})} />}
                        />
                    </MenuContext>
                </DrawerLayout>
            </View>
        );
    }
});

module.exports = MainView;
