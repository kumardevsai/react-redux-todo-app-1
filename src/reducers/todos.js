import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  COMPLETE_ALL,
  DUPLICATE_ITEM,
} from '../constants/ActionTypes'
// jotform
const initialState = [
  {
    id: 0,
    todo: 'Use Redux',
    done: false,
    isDuplicate: false,
  },
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          todo: action.text,
          isDuplicate: action.isItemExists,
          done: false,
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
