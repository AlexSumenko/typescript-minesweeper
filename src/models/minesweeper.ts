export enum Routes {
  HOME_PAGE = '/',
  GAME_BOARD = '/game-board',
  LEADER_BOARD = '/leader-board',
}

export enum GameStates {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  WON = 'WON',
  LOST = 'LOST',
}

export enum Locales {
  EN = 'EN',
  RU = 'RU',
}

export type PlayingCellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'mine';

export interface IPlayingCell {
  value: PlayingCellValue;
  isOpened: boolean;
}

export type PlayFieldArray = IPlayingCell[][];

export type CellPosition = [number, number];

export type GameState =
  | GameStates.NOT_STARTED
  | GameStates.IN_PROGRESS
  | GameStates.PAUSED
  | GameStates.WON
  | GameStates.LOST;
