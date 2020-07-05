import * as REDGRAPE from '../actionTypes/Redgrape';

const initialState = {
  offers: {},
  zipcode: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REDGRAPE.GET_OFFERS:
      return {
        ...state,
        isLoading: true,
      };
    case REDGRAPE.GET_OFFERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offers: action.response.response,
      };
    case REDGRAPE.GET_OFFERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case REDGRAPE.GET_ZIPCODE:
      return {
        ...state,
        isLoading: true,
      };
    case REDGRAPE.GET_ZIPCODE_SUCCESS: {
      const response = action.response || {};
      return {
        ...state,
        isLoading: false,
        zipcode: response,
      };
    }
    case REDGRAPE.GET_ZIPCODE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.response.errorResponse,
      };
    default:
      return state;
  }
};
