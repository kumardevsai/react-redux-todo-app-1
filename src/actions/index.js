import axios from 'axios'
import _ from 'lodash'

import * as types from '../constants/ActionTypes'
import * as Uitypes from '../constants/UiActionTypes'

const API_KEY = 'b4268d2e7836001e26df451ee96f2b26'
const FORM_ID = '80582497523969'
const FETCH_SUBMISSIONS = 'https://api.jotform.com/form/'

export const completeTodo = id => ({ type: types.COMPLETE_TODO, id, done: true })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const addTodo = (text, isDone, id) => (dispatch, getState) => {
  const isItemExists =
    getState()
      .todos.filter(todo => todo.done === false && todo.isDuplicate === false)
      .findIndex(todo => todo.todo === text) > -1
  if (isItemExists === true) {
    setTimeout(() => {
      dispatch({ type: Uitypes.NOTIFICATION_FALSE, isItemExists })
    }, 1000)
  }

  dispatch({
    type: types.ADD_TODO,
    text,
    isItemExists,
    isDone,
    id,
  })
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}

export const fetchSubmissions = () => (dispatch) => {
  const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}&orderby=id`
  const request = axios.get(url)
  request
    .then((get) => {
      const a = get.data.content.map(data =>
        _.merge(data.answers, { done: data.flag }, { id: data.id }))
      const x = a.map(data => _.merge(data[3], { done: data.done }, { id: data.id }))
      x.map(data => dispatch(addTodo(data.answer, data.done, data.id)))
    })
    .catch((error) => {
      console.log(error)
    })
}
