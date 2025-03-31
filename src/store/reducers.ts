
import { combineReducers } from 'redux';
import { keplerGlReducer } from 'kepler.gl/reducers';

const customReducer = (state = {}, action: any) => {
  return state;
};

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
  app: customReducer
});

export default reducers;
