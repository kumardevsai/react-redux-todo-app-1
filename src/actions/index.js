import axios from 'axios'

import _ from 'lodash'

import * as types from '../constants/ActionTypes'
import * as Uitypes from '../constants/UiActionTypes'

axios.defaults.headers.post['content-type'] = 'application/json'

const API_KEY = 'b4268d2e7836001e26df451ee96f2b26'
const FORM_ID = '80582497523969'
const FETCH_SUBMISSIONS = 'https://api.jotform.com/form/'

export const completeTodo = id => dispatch => (
  axios({
    method: 'post',
    url: `https://api.jotform.com/submission/${id}?apikey=b4268d2e7836001e26df451ee96f2b26`,
    params: {
      'submission[flag]': 1,
    },
  })
    .then(response => response)
    .catch(error => error),
  dispatch({ type: types.COMPLETE_TODO, id, done: true })
)

export const completeAll = () => (dispatch, getState) => {
  const areAllMarked = getState().todos.every(todo => todo.done)
  let isDoneTodo = 1
  areAllMarked ? (isDoneTodo = 0) : isDoneTodo
  getState().todos.map(data =>
    axios({
      method: 'post',
      url: `https://api.jotform.com/submission/${data.id}?apikey=b4268d2e7836001e26df451ee96f2b26`,
      params: {
        'submission[flag]': isDoneTodo,
      },
    }))
  dispatch({ type: types.COMPLETE_ALL })
}

export const deleteTodo = id => (dispatch) => {
  const URL = `https://api.jotform.com/submission/${id}?apikey=b4268d2e7836001e26df451ee96f2b26`
  axios.delete(URL, { params: { id } }).then(dispatch({ type: types.DELETE_TODO, id }))
}

export const addTodo = (text, isDone, id, isItemExists = false) => (dispatch) => {
  dispatch({
    type: types.ADD_TODO,
    text,
    isItemExists,
    isDone,
    id,
  })
}

export const fetchSubmissions = () => (dispatch) => {
  const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}&orderby=id`
  const request = axios.get(url)
  request
    .then((get) => {
      const a = get.data.content.map(data =>
        _.merge(data.answers, { done: data.flag }, { id: data.id }))
      const x = a.map(data => _.merge(data[3], { done: data.done }, { id: data.id }))
      x.map(data => dispatch(addTodo(data.answer || 'test', data.done, data.id)))
    })
    .catch((error) => {
      console.log(error)
    })
}

export const fetchPOST = text => (dispatch, getState) => {
  const isItemExists =
    getState()
      .todos.filter(todo => todo.done === false && todo.isDuplicate === false)
      .findIndex(todo => todo.todo === text) > -1
  if (isItemExists !== true) {
    const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}`
    axios({
      method: 'post',
      url,
      params: {
        'submission[3]': text,
      },
    })
      .then(res => dispatch(addTodo(text, false, res.data.content.submissionID)))
      .catch(err => console.log(err))
  } else {
    setTimeout(() => {
      dispatch({ type: Uitypes.NOTIFICATION_FALSE, isItemExists })
    }, 1000)
  }
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}
