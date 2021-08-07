import { combineReducers } from 'redux';
import bikesRentReducer from './BikesRentReducer';

const rootReducer = combineReducers({
  mainReducer: bikesRentReducer
});

export default rootReducer;
