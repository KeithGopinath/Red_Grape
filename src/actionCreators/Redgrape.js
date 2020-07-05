import * as REDGRAPE from '../actionTypes/Redgrape';

export function getOffers() {
  return {
    type: REDGRAPE.GET_OFFERS,
  };
}

export function getOffersSuccess(response) {
  return {
    type: REDGRAPE.GET_OFFERS_SUCCESS,
    response,
  };
}

export function getOffersFailure(error) {
  return {
    type: REDGRAPE.GET_OFFERS_FAILURE,
    error,
  };
}

export function getZipcode(zipCode) {
  // eslint-disable-next-line no-console
  // console.log('zipCode', zipCode);
  return {
    type: REDGRAPE.GET_ZIPCODE,
    zipCode,
  };
}

export function getZipcodeSuccess(response) {
  return {
    type: REDGRAPE.GET_ZIPCODE_SUCCESS,
    response,
  };
}

export function getZipcodeFailure(error) {
  return {
    type: REDGRAPE.GET_ZIPCODE_FAILURE,
    error,
  };
}
