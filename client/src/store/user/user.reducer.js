import userTypes from './user.types';

const initialState = {
  clientDataLoading: true,
  clientData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.DATA_LOADING:
      return {
        ...state,
        clientDataLoading: true,
      };
    case userTypes.DATA_LOADED:
      return {
        clientDataLoading: false,
        clientData: action.payload,
      };
    case userTypes.DATA_ERROR:
      return {
        clientData: {},
        clientDataLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
