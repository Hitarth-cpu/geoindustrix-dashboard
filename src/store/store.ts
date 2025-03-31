
import { createStore, applyMiddleware, compose } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import reducers from './reducers';

const initialState = {};

// Creating the store with middleware
const middlewares = [taskMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

// Add Redux DevTools Extension if available
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  initialState,
  composeEnhancers(...enhancers)
);
