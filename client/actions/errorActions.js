export function throwError(message) {
  return {
    type: 'ERROR',
    message: message
  }
}
