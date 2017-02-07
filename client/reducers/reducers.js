import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import tasksReducer from './tasksReducer'
import authFormReducer from './authFormReducer'
import userReducer from './userReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  tasks: tasksReducer,
  authForm: authFormReducer,
  loggedInUser: userReducer,
  errorReducer: errorReducer,
  form: formReducer
});
