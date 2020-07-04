import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...[sagaMiddleware]),
  )
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
