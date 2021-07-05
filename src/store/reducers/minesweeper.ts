import {
  CellPosition,
  GameStates,
  PlayFieldArray,
} from '../../models/minesweeper';
import {
  ActionTypes,
  MinesweeperActions,
  IPlayFieldState,
} from '../../models/store';
import {
  deepClonePlayFieldArray,
  handleGuessedValueChange,
  openMineCells,
} from '../../utils/helpers';

const initialState: IPlayFieldState = {
  playField: [],
  playFieldSize: 10,
  minesLeft: 0,
  gameState: GameStates.NOT_STARTED,
};

const reducer = (
  state: IPlayFieldState = initialState,
  action: MinesweeperActions
): IPlayFieldState => {
  switch (action.type) {
    case ActionTypes.SAVE_PLAY_FIELD_TO_STORE:
      return {
        ...state,
        playField: action.payload.playField,
        minesLeft: action.payload.minesLeft,
      };
    case ActionTypes.SET_CELL_OPEN:
      const [openX, openY]: CellPosition = action.payload;
      const newPlayField: PlayFieldArray = deepClonePlayFieldArray(
        state.playField
      );
      newPlayField[openX][openY].isOpened = true;
      return { ...state, playField: newPlayField };
    case ActionTypes.OPEN_MINE_CELLS:
      const playFieldWithOpenMines: PlayFieldArray = openMineCells(
        state.playField
      );
      return { ...state, playField: playFieldWithOpenMines };
    case ActionTypes.CHANGE_GAME_STATE:
      return { ...state, gameState: action.payload };
    case ActionTypes.SET_GUESSED_VALUE:
      const [x, y]: CellPosition = action.payload;
      let newMinesLeft: number = 0;
      const playFieldWithGuessedValue: PlayFieldArray = deepClonePlayFieldArray(
        state.playField
      );
      [playFieldWithGuessedValue[x][y].guessedValue, newMinesLeft] =
        handleGuessedValueChange(
          playFieldWithGuessedValue[x][y].guessedValue,
          state.minesLeft
        );
      return {
        ...state,
        playField: playFieldWithGuessedValue,
        minesLeft: newMinesLeft,
      };
    default:
      return state;
  }
};

export default reducer;
