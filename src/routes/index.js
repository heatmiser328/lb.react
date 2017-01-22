import React from 'react';
import { connect } from 'react-redux';
import { Actions, Scene } from 'react-native-router-flux';
import {NavBar} from 'react-native-nub';
import {HomeView,AboutView,BattleView} from '../views';
import {reset as refresh} from '../actions/current';
import Icons from '../res';

const rightButtons = [
    {image:'refresh', onPress: () => console.log('Press refresh!')},
    {image:'info', onPress: () => Actions.about() }
];

const navBarOpts = {
    icons: Icons,
    style: {
        backgroundColor: 'blue'
    },    
    textcolor: 'white',
    menu: 'menu',
    //left: 'back',
    //onBack: Actions.pop,
    rightButtons: rightButtons
};

const NavBarMain = NavBar(navBarOpts);

export default Actions.create(
    <Scene key="root" navBar={NavBarMain}>
        <Scene key="home" type="reset" component={HomeView} title="La Bataille Assistant" initial={true}/>
        <Scene key="battle" component={BattleView} title="" />
        <Scene key="about" component={AboutView} title="About" />
    </Scene>
);
