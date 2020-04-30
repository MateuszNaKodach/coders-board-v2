import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';

export const rootReducer = combineReducers({
  counter: counterReducer,
});
