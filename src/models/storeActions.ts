import { CellPosition, GameState, PlayFieldArray } from './minesweeper';

export enum ActionTypes {
  SAVE_PLAY_FIELD_TO_STORE = 'SAVE_PLAY_FIELD_TO_STORE',
  SET_CELL_OPEN = 'SET_CELL_OPEN',
  CHANGE_GAME_STATE = 'CHANGE_GAME_STATE',
}

export interface ISavePlayingFieldToStoreAction {
  type: typeof ActionTypes.SAVE_PLAY_FIELD_TO_STORE;
  payload: PlayFieldArray;
}

export interface ISetCellOpenAction {
  type: typeof ActionTypes.SET_CELL_OPEN;
  payload: CellPosition;
}

export interface IChangeGameStateAction {
  type: typeof ActionTypes.CHANGE_GAME_STATE;
  payload: GameState;
}

export type MinesweeperActions =
  | ISavePlayingFieldToStoreAction
  | ISetCellOpenAction
  | IChangeGameStateAction;

export interface IPlayFieldState {
  playField: PlayFieldArray;
  playFieldSize: number;
  minesLeft: number;
  gameState: GameState;
}

export interface IAppState {
  msw: IPlayFieldState;
}
