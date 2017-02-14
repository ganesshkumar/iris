export default tasksReducer = (state = {
  items: {},
  tasksOrder: [],
  lastSyncAt: null
}, action) => {
  switch (action.type) {
    case 'SYNC_TASKS':
      return Object.assign({}, state, {
        items: action.tasks.reduce((map, task) => {
          map[task._id] = task;
          return map;
        }, {}),
        tasksOrder: action.tasksOrder,
        lastSyncAt: action.lastSyncAt
      })
    default:
      return state
  }
};
