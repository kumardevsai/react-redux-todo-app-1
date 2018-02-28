import * as types from '../constants/ActionTypes'
import * as Uitypes from '../constants/UiActionTypes'

export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const addTodo = text => (dispatch, getState) => {
  const isItemExists = getState().todos.findIndex(todo => todo.todo === text) > -1
  if (isItemExists === true) {
    setTimeout(() => {
      dispatch({ type: Uitypes.NOTIFICATION_FALSE, isItemExists })
    }, 2000)
  }
  dispatch({ type: types.ADD_TODO, text, isItemExists })
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}
/**
 * Bildirim görüntülenmesini,, UiAction'da yap.
 * Short if'lerde '' yerine ne kulanılabilir?
 */
