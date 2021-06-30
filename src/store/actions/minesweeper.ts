import {
  ActionTypes,
  ISavePlayingFieldToStoreAction,
} from '../../models/storeActions';
import { PlayFieldArray } from '../../models/minesweeper';

export const savePlayingFieldToStore = (
  playField: PlayFieldArray
): ISavePlayingFieldToStoreAction => {
  return {
    type: ActionTypes.SavePlayingFieldToStore,
    payload: playField,
  };
};
