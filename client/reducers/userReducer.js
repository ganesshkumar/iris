export default userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CHANGED':
      return action.user
    default:
      return state
  }
};
