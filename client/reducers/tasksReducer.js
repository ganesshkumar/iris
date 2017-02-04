export default tasksReducer = (state = {
  items: [],
  lastSyncAt: null
}, action) => {
  switch (action.type) {
    case 'SYNC_TASKS':
      return Object.assign({}, state, {
        items: action.tasks.reduce((map, task) => {
          map[task._id] = task;
          return map;
        }, {}),
        lastSyncAt: action.lastSyncAt
      })
    default:
      return state
  }
};
