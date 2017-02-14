import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { throwError } from './errorActions'

export function selectForm(authForm) {
  return {
    type: 'AUTH_FORM_SELECTED',
    form: authForm
  }
}

export function userChanged(user) {
  return {
    type: 'USER_CHANGED',
    user: user
  }
}

export function signup(username, email, password) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Accounts.createUser({
        username,
        email,
        password
      }, (error) => error ? reject(error) : resolve());
    })
    .then(() => dispatch(userChanged(Meteor.user())))
    .then(() => window.location.href="#")
    .catch(error => dispatch(throwError(error)))
  }
}

export function login(username, password) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(username, password,
        (error) => error ? reject(error) : resolve());
    })
    .then(() => dispatch(userChanged(Meteor.user())))
    .then(() => window.location.href="#")
    .catch(error => dispatch(throwError(error)))
  }
}
