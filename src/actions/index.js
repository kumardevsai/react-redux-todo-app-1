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
  //
  console.log('pikacu', text)
  dispatch({ type: types.ADD_TODO, text, isItemExists })
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}

export const fetchSubmissions = () => (dispatch) => {
  const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}&orderby=id`
  const request = axios.get(url)
  request
    .then((get) => {
      const temp = get.data.content.map(data => data.answers)
      const answer = temp.map(data => data[3])
      answer.map(data => dispatch(addTodo(data.answer)))

      // console.log(ans)
    })
    .catch((error) => {
      console.log(error)
    })
}

/**
 * Bildirim görüntülenmesini,, UiAction'da yap.

 */
