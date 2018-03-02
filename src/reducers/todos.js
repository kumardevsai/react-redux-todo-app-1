import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  COMPLETE_ALL,
  DUPLICATE_ITEM,
} from '../constants/ActionTypes'
// jotform
/* const initialState = [
  {
    id: 0,
    todo: 'Use Redux',
    done: false,
    isDuplicate: false,
  },
] */

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      let done = action.isDone === '1' ? (done = true) : (done = false)
      return [
        ...state,
        {
          id: action.id === '#SampleSubmissionID' ? Date.now() : action.id,
          todo: action.text,
          isDuplicate: action.isItemExists,
          done,
        },
      ]

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

    case DUPLICATE_ITEM:
      console.log(action.text)

    default:
      return state
  }
}
