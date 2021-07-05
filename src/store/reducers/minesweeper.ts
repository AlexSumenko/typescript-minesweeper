import {
  CellPosition,
  GameStates,
  GameFieldArray,
} from '../../models/minesweeper';
import {
  MinesweeperActionTypes,
  MinesweeperActions,
  IgameFieldState,
} from '../../models/store';
import {
  deepCloneGameFieldArray,
  handleGuessedValueChange,
  openMineCells,
} from '../../utils/helpers';

const initialState: IgameFieldState = {
  gameField: [],
  gameFieldSize: 10,
  minesLeft: 0,
  gameState: GameStates.NOT_STARTED,
};

const reducer = (
  state: IgameFieldState = initialState,
  action: MinesweeperActions
): IgameFieldState => {
  switch (action.type) {
    case MinesweeperActionTypes.SAVE_GAME_FIELD_TO_STORE:
      return {
        ...state,
        gameField: action.payload.gameField,
        minesLeft: action.payload.minesLeft,
      };
    case MinesweeperActionTypes.SET_CELL_OPEN:
      const [openX, openY]: CellPosition = action.payload;
      const newgameField: GameFieldArray = deepCloneGameFieldArray(
        state.gameField
      );
      newgameField[openX][openY].isOpened = true;
      return { ...state, gameField: newgameField };
    case MinesweeperActionTypes.OPEN_MINE_CELLS:
      const gameFieldWithOpenMines: GameFieldArray = openMineCells(
        state.gameField
      );
      return { ...state, gameField: gameFieldWithOpenMines };
    case MinesweeperActionTypes.CHANGE_GAME_STATE:
      return { ...state, gameState: action.payload };
    case MinesweeperActionTypes.SET_GUESSED_VALUE:
      const [x, y]: CellPosition = action.payload;
      let newMinesLeft: number = 0;
      const gameFieldWithGuessedValue: GameFieldArray = deepCloneGameFieldArray(
        state.gameField
      );
      [gameFieldWithGuessedValue[x][y].guessedValue, newMinesLeft] =
        handleGuessedValueChange(
          gameFieldWithGuessedValue[x][y].guessedValue,
          state.minesLeft
        );
      return {
        ...state,
        gameField: gameFieldWithGuessedValue,
        minesLeft: newMinesLeft,
      };
    default:
      return state;
  }
};

export default reducer;
