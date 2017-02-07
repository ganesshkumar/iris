var errorId = 1
export default errorReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ERROR':
      return Object.assign({}, state, {
        [errorId]: action.message
      })
    default:
      return state
  }
};
