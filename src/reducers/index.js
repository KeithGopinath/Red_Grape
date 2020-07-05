import { combineReducers } from 'redux';
import redgrape from './Redgrape';

const rootReducer = combineReducers({
  redgrapeState: redgrape,
});

export default rootReducer;
