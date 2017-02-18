export default appPropsReducer = (state = {
  isDrawerOpened: false,
  showNewTaskForm: false
}, action) => {
  switch (action.type) {
    case 'DRAWER_STATE':
      return Object.assign({}, state, {
        isDrawerOpened: action.status
      })
    case 'SHOW_TASK_FORM':
      return Object.assign({}, state, {
        showNewTaskForm: action.show
      })
    default:
      return state
  }
};
