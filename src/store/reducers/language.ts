import { Locales } from '../../models/minesweeper';
import {
  ILanguageState,
  LanguageActions,
  LanguageActionTypes,
} from '../../models/store';

const initialState: ILanguageState = {
  selectedLanguage: Locales.EN,
};

const reducer = (
  state: ILanguageState = initialState,
  action: LanguageActions
): ILanguageState => {
  switch (action.type) {
    case LanguageActionTypes.TOGGLE_SELECTED_LANGUAGE:
      return { ...state, selectedLanguage: action.payload };
    default:
      return state;
  }
};

export default reducer;
