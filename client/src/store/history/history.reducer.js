import historyTypes from './history.types';

import { addToHistory, setInitialSessionStorage } from './history.helpers';

const initialState = {
  history:
    JSON.parse(sessionStorage.getItem('history')) || setInitialSessionStorage(),
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case historyTypes.ADD_ITEM:
      let updated = addToHistory(action.payload);
      return {
        ...state,
        history: JSON.parse(updated),
      };
    default:
      return state;
  }
};

export default historyReducer;
