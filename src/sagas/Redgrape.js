/* eslint-disable no-debugger */
import { call, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as REDGRAPE from '../actionTypes/Redgrape';
import * as redgrapeActionCreators from '../actionCreators/Redgrape';
// import { doGet } from '../utils/fetchWrapper';


export function* getOffers() {
  try {
    const response = yield call(() => fetch('https://www.wsjwine.com/api/offer/0033008')
      .then((res) => res.json()));
    yield put(redgrapeActionCreators.getOffersSuccess(response));
  } catch (error) {
    yield put(redgrapeActionCreators.getOffersFailure(error));
  }
}

export function* getZipcode(value) {
  const { zipCode } = value;
  try {
    const data = yield call(() => fetch(`https://www.wsjwine.com/api/address/zipcode/${zipCode}`)
      .then((res) => res.json()));
    const { response } = data;
    yield put(redgrapeActionCreators.getZipcodeSuccess(response));
  } catch (error) {
    yield put(redgrapeActionCreators.getZipcodeFailure(error));
  }
}

export function* redgrapeWatchers() {
  yield [
    takeLatest(REDGRAPE.GET_OFFERS, getOffers),
    takeLatest(REDGRAPE.GET_ZIPCODE, getZipcode),
  ];
}
