import {
  ActionTypes,
  ISavePlayingFieldToStoreAction,
  IPlayFieldState,
} from '../../models/storeActions';

const initialState: IPlayFieldState = {
  playField: [],
  playFieldSize: 10,
};

const reducer = (
  state: IPlayFieldState = initialState,
  action: ISavePlayingFieldToStoreAction
): IPlayFieldState => {
  switch (action.type) {
    case ActionTypes.SavePlayingFieldToStore:
      return { ...state, playField: action.payload };
    default:
      return state;
  }
};

export default reducer;
