import { ADD_TODO, COMPLETE_TODO } from '../constants/ActionTypes'

const initialState = [
  {
    id: 0,
    todo: 'Use Redux',
    done: false,
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
          done: false,
        },
      ]



    case COMPLETE_TODO:
      return state.map(todo => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))


    default:
      return state
  }
}
