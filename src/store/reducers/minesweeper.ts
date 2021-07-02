import {
  GameStates,
  IPlayingCell,
  PlayFieldArray,
} from '../../models/minesweeper';
import {
  ActionTypes,
  MinesweeperActions,
  IPlayFieldState,
} from '../../models/storeActions';

const initialState: IPlayFieldState = {
  playField: [],
  playFieldSize: 10,
  minesLeft: 10,
  gameState: GameStates.NOT_STARTED,
};

const reducer = (
  state: IPlayFieldState = initialState,
  action: MinesweeperActions
): IPlayFieldState => {
  switch (action.type) {
    case ActionTypes.SAVE_PLAY_FIELD_TO_STORE:
      return { ...state, playField: action.payload };
    case ActionTypes.SET_CELL_OPEN:
      const [x, y] = action.payload;
      const newPlayField: PlayFieldArray = state.playField.map(
        (row: IPlayingCell[]): IPlayingCell[] =>
          row.map((rowEl: IPlayingCell): IPlayingCell => {
            return { ...rowEl };
          })
      );
      newPlayField[x][y].isOpened = true;
      return { ...state, playField: newPlayField };
    case ActionTypes.CHANGE_GAME_STATE:
      return { ...state, gameState: action.payload };
    default:
      return state;
  }
};

export default reducer;
