import { enabledLanguages, localizationData } from '../../Intl/setup';
import * as types from '../actions/actionTypes';

const initLocale = global.navigator && global.navigator.language || 'en';

const initialState = {
  locale: initLocale,
  enabledLanguages,
  ...(localizationData[initLocale] || {}),
};

const IntlReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_LANGUAGE: {
      const { type, ...actionWithoutType } = action; // eslint-disable-line
      return { ...state, ...actionWithoutType };
    }

    default:
      return state;
  }
};

export default IntlReducer;
