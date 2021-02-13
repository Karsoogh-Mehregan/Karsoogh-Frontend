import { combineReducers } from 'redux';
import account from './account';
import Notifications from './notifications';
import redirect from './redirect';
import exam from './exam';

const allReducers = combineReducers({
  Notifications,
  account,
  redirect,
});
export default allReducers;
