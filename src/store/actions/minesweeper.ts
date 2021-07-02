import {
  ActionTypes,
  ISavePlayingFieldToStoreAction,
  ISetCellOpenAction,
  IStartGameAction,
} from '../../models/storeActions';
import { PlayFieldArray } from '../../models/minesweeper';
import { CellPosition } from '../../models/minesweeper';

export const savePlayingFieldToStore = (
  playField: PlayFieldArray
): ISavePlayingFieldToStoreAction => {
  return {
    type: ActionTypes.SAVE_PLAY_FIELD_TO_STORE,
    payload: playField,
  };
};

export const setCellOpen = (cellPosition: CellPosition): ISetCellOpenAction => {
  return {
    type: ActionTypes.SET_CELL_OPEN,
    payload: cellPosition,
  };
};

export const startGame = (): IStartGameAction => {
  return {
    type: ActionTypes.START_GAME,
  };
};
