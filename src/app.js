import React from 'react';
import {Text} from 'react-native';
import { Router } from 'react-native-router-flux';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './stores/store';
import {NavDrawer} from './views';

let App = React.createClass({    
    componentWillMount() {
        Text.defaultProps.allowFontScaling = false;
    },
    render () {      
        return (            
            <Provider store={store}>
                <NavDrawer>
                    <Router style={{flex:1}} scenes={routes} />
                </NavDrawer>                
            </Provider>            
        );
    }
});

module.exports = App;
