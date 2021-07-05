import { CellPosition, GameState, GameFieldArray } from './minesweeper';

export enum MinesweeperActionTypes {
  SAVE_GAME_FIELD_TO_STORE = 'SAVE_GAME_FIELD_TO_STORE',
  SET_CELL_OPEN = 'SET_CELL_OPEN',
  OPEN_MINE_CELLS = 'OPEN_MINE_CELLS',
  CHANGE_GAME_STATE = 'CHANGE_GAME_STATE',
  SET_GUESSED_VALUE = 'SET_GUESSED_VALUE',
}

export interface ISaveGameFieldToStoreAction {
  type: typeof MinesweeperActionTypes.SAVE_GAME_FIELD_TO_STORE;
  payload: { gameField: GameFieldArray; minesLeft: number };
}

export interface ISetCellOpenAction {
  type: typeof MinesweeperActionTypes.SET_CELL_OPEN;
  payload: CellPosition;
}

export interface IOpenMineCells {
  type: typeof MinesweeperActionTypes.OPEN_MINE_CELLS;
}

export interface IChangeGameStateAction {
  type: typeof MinesweeperActionTypes.CHANGE_GAME_STATE;
  payload: GameState;
}

export interface ISetGuessedValue {
  type: typeof MinesweeperActionTypes.SET_GUESSED_VALUE;
  payload: CellPosition;
}

export type MinesweeperActions =
  | ISaveGameFieldToStoreAction
  | ISetCellOpenAction
  | IOpenMineCells
  | IChangeGameStateAction
  | ISetGuessedValue;

export enum LanguageActionTypes {
  TOGGLE_SELECTED_LANGUAGE = 'TOGGLE_SELECTED_LANGUAGE',
}

export interface IToggleLanguage {
  type: typeof LanguageActionTypes.TOGGLE_SELECTED_LANGUAGE;
  payload: string;
}

export type LanguageActions = IToggleLanguage;

export interface IgameFieldState {
  gameField: GameFieldArray;
  gameFieldSize: number;
  minesLeft: number;
  gameState: GameState;
}

export interface ILanguageState {
  selectedLanguage: string;
}

export interface IAppState {
  msw: IgameFieldState;
  lang: ILanguageState;
}
