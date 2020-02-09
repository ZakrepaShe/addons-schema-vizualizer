import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as notifReducer } from 'redux-notifications';
import {isDev} from '../utils/helpers';
import reducers from './reducers';

const middlewares = [thunk];

if (isDev()) { // eslint-disable-line no-undef
  middlewares.push(require('redux-logger').createLogger({ collapsed: true }));
}

// eslint-disable-next-line no-undef
const composeEnhancers = (isDev() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  combineReducers({
      ...reducers,
    notifs: notifReducer,
  }),
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
