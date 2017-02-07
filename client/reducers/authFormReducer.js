export default authFormReducer = (state = 'LOGIN_FORM', action) => {
  switch (action.type) {
    case 'AUTH_FORM_SELECTED':
      return action.form
    default:
      return state
  }
};
