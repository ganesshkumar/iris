import { reset } from 'redux-form';
import { throwError } from './errorActions'
import { showNewTaskForm } from './applicationActions'

export function createTask(text) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.create', text, (error, result) =>
        error ? reject(error) : resolve())
    })
    .then(() => dispatch(showNewTaskForm(false)))
    .then(() => dispatch(reset('task')))
    .catch(error => dispatch(throwError(error)))
  }
}

export function setChecked(taskId, isChecked) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.setChecked', taskId, isChecked, (error, result) =>
        error ? reject(error) : resolve())
    })
    .catch(error => dispatch(throwError(error)))
  }
}

export function deleteTask(taskId) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.delete', taskId, (error, result) =>
        error ? reject(error) : resolve())
    })
    .catch(error => dispatch(throwError(error)))
  }
}

export function reorderTasks(tasksOrder) {
  return dispatch => {
    new Promise((resolve, reject) => {
      Meteor.call('tasks.setOrder',
          Meteor.userId(), tasksOrder,
          (error, result) => error ? reject(error): resolve()
      )
    })
    .catch(error => dispatch(throwError('Reorder failed')))
  }
}
