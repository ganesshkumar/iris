export function setDrawerState(status) {
  return {
    type: 'DRAWER_STATE',
    status: status
  }
}

/*
 * Tasks
 */
export function showNewTaskForm(show) {
  return {
    type: 'SHOW_TASK_FORM',
    show: show
  }
}
