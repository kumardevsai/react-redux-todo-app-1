import { NOTIFICATION_TRUE, NOTIFICATION_FALSE } from '../constants/UiActionTypes'

const initialState = [
  {
    duplicate: false,
    error: false,
  },
]

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TRUE:
      return {
        duplicate: action.isItemExists,
        error: false,
      }
    case NOTIFICATION_FALSE:
      return {
        duplicate: false,
        error: false,
      }
    default:
      return state
  }
}

export default notifications
