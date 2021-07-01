import { PlayFieldArray } from './minesweeper';

export enum ActionTypes {
  SavePlayingFieldToStore = 'GENERATE_PLAYING_FIELD',
}

export interface ISavePlayingFieldToStoreAction {
  type: typeof ActionTypes.SavePlayingFieldToStore;
  payload: PlayFieldArray;
}

export interface IPlayFieldState {
  playField: PlayFieldArray;
  playFieldSize: number;
}

export interface IAppState {
  msw: IPlayFieldState;
}
