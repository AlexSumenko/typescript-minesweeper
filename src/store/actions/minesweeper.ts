import {
  MinesweeperActionTypes,
  ISaveGameFieldToStoreAction,
  ISetCellOpenAction,
  IChangeGameStateAction,
  IOpenMineCells,
  ISetGuessedValue,
} from '../../models/store';
import { GameState, GameFieldArray } from '../../models/minesweeper';
import { CellPosition } from '../../models/minesweeper';

export const saveGameFieldToStore = (
  gameField: GameFieldArray,
  minesLeft: number
): ISaveGameFieldToStoreAction => {
  return {
    type: MinesweeperActionTypes.SAVE_GAME_FIELD_TO_STORE,
    payload: { gameField, minesLeft },
  };
};

export const setCellOpen = (cellPosition: CellPosition): ISetCellOpenAction => {
  return {
    type: MinesweeperActionTypes.SET_CELL_OPEN,
    payload: cellPosition,
  };
};

export const openMineCells = (): IOpenMineCells => {
  return {
    type: MinesweeperActionTypes.OPEN_MINE_CELLS,
  };
};

export const changeGameState = (
  gameState: GameState
): IChangeGameStateAction => {
  return {
    type: MinesweeperActionTypes.CHANGE_GAME_STATE,
    payload: gameState,
  };
};

export const setGuessedValue = (
  cellPosition: CellPosition
): ISetGuessedValue => {
  return {
    type: MinesweeperActionTypes.SET_GUESSED_VALUE,
    payload: cellPosition,
  };
};
