import { IToggleLanguage, LanguageActionTypes } from '../../models/store';

export const toggleLanguage = (newLanguage: string): IToggleLanguage => {
  localStorage.setItem('msw-lang', newLanguage);
  return {
    type: LanguageActionTypes.TOGGLE_SELECTED_LANGUAGE,
    payload: newLanguage,
  };
};
