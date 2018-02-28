import { combineReducers } from 'redux'
import todos from './todos'
import ui from './ui'

const rootReducer = combineReducers({
  todos,
  ui,
})

export default rootReducer
