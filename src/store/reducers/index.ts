import { combineReducers } from 'redux';
import minesweeperReducer from './minesweeper';

const rootReducer = combineReducers({
  msw: minesweeperReducer,
});

export default rootReducer;
