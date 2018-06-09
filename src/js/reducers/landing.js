import {
  LANDING_LOAD,
  LANDING_UNLOAD
} from '../actions';
import {
  createReducer
} from './utils';

const initialState = {
  task: undefined
};

const handlers = {
  [LANDING_LOAD]: (state, action) => {
    if (!action.error) {
      action.payload.error = undefined;
      return action.payload;
    }
    return {
      error: action.payload
    };
  },
  [LANDING_UNLOAD]: () => initialState
};

export default createReducer(initialState, handlers);
