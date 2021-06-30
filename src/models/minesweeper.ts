export enum Routes {
  HomePage = '/',
  GameBoard = '/game-board',
  LeaderBoard = '/leader-board',
}

export enum Locales {
  EN = 'EN',
  RU = 'RU',
}

export type PlayingCellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'mine' | null;

export interface IPlayingCell {
  x: number;
  y: number;
  value: PlayingCellValue;
  isOpened: boolean;
}

export type PlayFieldArray = IPlayingCell[][];
