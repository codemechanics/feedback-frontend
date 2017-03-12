import {combineReducers} from 'redux';
import organizations from './organizationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  organizations,
  ajaxCallsInProgress
});

export default rootReducer;
