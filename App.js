/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';

import {View} from 'react-native';

import thunk from 'redux-thunk';

import logger from 'redux-logger'

import gameInfoReducer from './redux/reducers/gameInfoReducer';

import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  gameInfoReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

export default App;