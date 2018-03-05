import { ADD_TODO, COMPLETE_TODO, DELETE_TODO, COMPLETE_ALL } from '../constants/ActionTypes'

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      const a = action.payload.map(todo => ({
        text: todo.answer || todo.text,
        done: todo.done === '1',
        id: todo.id,
        isItemExists: false,
      }))
      return [...state, ...a]

    case COMPLETE_TODO:
      return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))

    case DELETE_TODO:
      const currentTodoIndex = state.findIndex(todo => todo.id === action.id)
      const newState = [...state]
      newState.splice(currentTodoIndex, 1)
      return newState

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.done)
      return state.map(todo => ({
        ...todo,
        done: !areAllMarked,
      }))

    default:
      return state
  }
}
