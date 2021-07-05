import { combineReducers } from 'redux';
import minesweeperReducer from './minesweeper';
import languageReducer from './language';

const rootReducer = combineReducers({
  msw: minesweeperReducer,
  lang: languageReducer,
});

export default rootReducer;
