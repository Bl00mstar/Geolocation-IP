import errorTypes from './error.types';

const initialState = {
  isError: false,
  errorMessage: '',
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorTypes.ERROR_SET:
      return {
        isError: true,
        errorMessage: action.payload,
      };
    case errorTypes.ERROR_CLEAR:
      return {
        isError: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default errorReducer;
