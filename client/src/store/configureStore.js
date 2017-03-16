import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const logger = createLogger();
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
  );
}