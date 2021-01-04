import errorTypes from './error.types';

export const clearError = () => {
  return { type: errorTypes.ERROR_CLEAR };
};

export const setError = (data) => {
  return { type: errorTypes.ERROR_SET, payload: data };
};
