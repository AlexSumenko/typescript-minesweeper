import {
  ActionTypes,
  ISavePlayingFieldToStoreAction,
  ISetCellOpenAction,
  IChangeGameStateAction,
  IOpenMineCells,
  ISetGuessedValue,
} from '../../models/store';
import { GameState, PlayFieldArray } from '../../models/minesweeper';
import { CellPosition } from '../../models/minesweeper';

export const savePlayingFieldToStore = (
  playField: PlayFieldArray,
  minesLeft: number
): ISavePlayingFieldToStoreAction => {
  return {
    type: ActionTypes.SAVE_PLAY_FIELD_TO_STORE,
    payload: { playField, minesLeft },
  };
};

export const setCellOpen = (cellPosition: CellPosition): ISetCellOpenAction => {
  return {
    type: ActionTypes.SET_CELL_OPEN,
    payload: cellPosition,
  };
};

export const openMineCells = (): IOpenMineCells => {
  return {
    type: ActionTypes.OPEN_MINE_CELLS,
  };
};

export const changeGameState = (
  gameState: GameState
): IChangeGameStateAction => {
  return {
    type: ActionTypes.CHANGE_GAME_STATE,
    payload: gameState,
  };
};

export const setGuessedValue = (
  cellPosition: CellPosition
): ISetGuessedValue => {
  return {
    type: ActionTypes.SET_GUESSED_VALUE,
    payload: cellPosition,
  };
};
