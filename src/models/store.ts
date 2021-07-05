import { CellPosition, GameState, PlayFieldArray } from './minesweeper';

export enum ActionTypes {
  SAVE_PLAY_FIELD_TO_STORE = 'SAVE_PLAY_FIELD_TO_STORE',
  SET_CELL_OPEN = 'SET_CELL_OPEN',
  OPEN_MINE_CELLS = 'OPEN_MINE_CELLS',
  CHANGE_GAME_STATE = 'CHANGE_GAME_STATE',
  SET_GUESSED_VALUE = 'SET_GUESSED_VALUE',
}

export interface ISavePlayingFieldToStoreAction {
  type: typeof ActionTypes.SAVE_PLAY_FIELD_TO_STORE;
  payload: { playField: PlayFieldArray; minesLeft: number };
}

export interface ISetCellOpenAction {
  type: typeof ActionTypes.SET_CELL_OPEN;
  payload: CellPosition;
}

export interface IOpenMineCells {
  type: typeof ActionTypes.OPEN_MINE_CELLS;
}

export interface IChangeGameStateAction {
  type: typeof ActionTypes.CHANGE_GAME_STATE;
  payload: GameState;
}

export interface ISetGuessedValue {
  type: typeof ActionTypes.SET_GUESSED_VALUE;
  payload: CellPosition;
}

export type MinesweeperActions =
  | ISavePlayingFieldToStoreAction
  | ISetCellOpenAction
  | IOpenMineCells
  | IChangeGameStateAction
  | ISetGuessedValue;

export interface IPlayFieldState {
  playField: PlayFieldArray;
  playFieldSize: number;
  minesLeft: number;
  gameState: GameState;
}

export interface IAppState {
  msw: IPlayFieldState;
}
