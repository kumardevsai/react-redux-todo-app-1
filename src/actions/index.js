import * as types from '../constants/ActionTypes'

export const duplicateItem = text => ({ type: types.DUPLICATE_ITEM, text })
export const addTodo = text => ({ type: types.ADD_TODO, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })

// THUNK

export const checkDuplicateItem = item => (dispatch) => {
  dispatch(duplicateItem(item))
}
