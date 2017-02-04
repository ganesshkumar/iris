import { Tracker } from 'meteor/tracker'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers/reducers'
import { Tasks } from '../../imports/api/tasks'

const loggerMiddleware = createLogger()

export default (preloadedState) => {
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  Tracker.autorun(() => {
    const tasks = Tasks.find({}).fetch()

    store.dispatch({
      type: 'SYNC_TASKS',
      tasks: tasks,
      lastSyncAt: new Date()
    });
  });

  return store;
};
