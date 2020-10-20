import App from './src/App';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
/**
 * @format
 */
import React from 'react';
import {name as appName} from './app.json';
// import store from './src/services/redux/store/index';


const StateManagement = () => (
  // <Provider store={store}>
    <App />
  // </Provider>
);

AppRegistry.registerComponent(appName, () => StateManagement);
