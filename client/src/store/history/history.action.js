import historyTypes from './history.types';

export const addItemToHistory = (data) => {
  console.log(data);
  return { type: historyTypes.ADD_ITEM, payload: data };
};
