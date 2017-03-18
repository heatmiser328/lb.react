import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {About} from 'react-native-nub';
import {logo} from '../res';

const AboutView = (props) => {
    return (
        <About logo={logo}
            title={'About La Bataille Assistant'}
            version={props.version}
            releasedate={moment(props.releasedate).format("MMMM Do YYYY, h:mm:ss a")}
            description={'A no frills assistant for the La Bataille system of wargames.'}
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
                {description: 'react-redux', url: 'https://github.com/reactjs/react-redux'},
                {description: 'react-native-router-flux', url: 'https://github.com/aksonov/react-native-router-flux'},
                {description: 'react-native-drawer', url: 'https://github.com/root-two/react-native-drawer'},
                {description: 'react-native-scrollable-tab-view', url: ''},
                {description: 'react-native-sound', url: ''},                
                {description: 'redux-persist', url: ''},
                {description: 'moment', url: ''}
            ]}
        />
    );
}

const mapStateToProps = (state) => ({
    version: state.info.version,
    releasedate: state.info.releasedate
});

module.exports = connect(
  mapStateToProps
)(AboutView);
