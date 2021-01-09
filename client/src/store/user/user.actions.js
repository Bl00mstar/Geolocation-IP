import userTypes from './user.types';

export const requestData = () => {
  return { type: userTypes.DATA_LOADING };
};

export const requestDataError = () => {
  return { type: userTypes.DATA_ERROR };
};

export const requestDataSuccess = (data) => {
  return { type: userTypes.DATA_LOADED, payload: data };
};
