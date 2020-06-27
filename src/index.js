import './index.css';

import * as serviceWorker from './serviceWorker';

import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import combineReducers from './reducers/combined-reducer';
// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers);
const store = createStore(persistedReducer, composeWithDevTools(compose(applyMiddleware(thunk))));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
