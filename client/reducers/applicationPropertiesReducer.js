export default appPropsReducer = (state = {
  isDrawerOpened: false
}, action) => {
  switch (action.type) {
    case 'DRAWER_STATE':
      return Object.assign({}, state, {
        isDrawerOpened: action.status
      })
    default:
      return state
  }
};
