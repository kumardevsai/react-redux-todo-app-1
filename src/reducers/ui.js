import { NOTIFICATION_TRUE, NOTIFICATION_FALSE } from '../constants/UiActionTypes'

const notifications = (state = '', action) => {
  switch (action.type) {
    case NOTIFICATION_TRUE:
      return {
        duplicate: action.isItemExists,
        error: false,
      }
    case NOTIFICATION_FALSE:
      return {
        duplicate: !action.isItemExists,
        error: false,
      }
    default:
      return state
  }
}

export default notifications
