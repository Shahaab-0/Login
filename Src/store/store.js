import {createStore, combineReducers} from 'redux';
import {userDetail} from './reducer/userDetail';

const rootReducers = combineReducers({
  userDetail,
});
export const store = createStore(rootReducers);
