import * as types from '../constants/ActionTypes'
import * as Uitypes from '../constants/UiActionTypes'

export const completeTodo = id => ({ type: types.COMPLETE_TODO, id, done: true })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })

export const addTodo = text => (dispatch, getState) => {
  const isItemExists =
    getState()
      .todos.filter(todo => todo.done === false && todo.isDuplicate === false)
      .findIndex(todo => todo.todo === text) > -1
  if (isItemExists === true) {
    setTimeout(() => {
      dispatch({ type: Uitypes.NOTIFICATION_FALSE, isItemExists })
    }, 1000)
  }
  dispatch({ type: types.ADD_TODO, text, isItemExists })
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}

/**
 * Bildirim görüntülenmesini,, UiAction'da yap.
 * Store'daki "ui" nereye karsılık gelmekte?
 * Eğer eleman done true ise duplicate olmasın
 */
