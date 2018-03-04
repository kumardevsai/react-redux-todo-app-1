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
  }),
  dispatch({ type: types.COMPLETE_TODO, id, done: true })
)

export const completeAll = () => (dispatch, getState) => {
  const areAllMarked = getState().todos.every(todo => todo.done)
  let isDoneTodo = 1
  if (areAllMarked) {
    isDoneTodo = 0
  }
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

export const deleteTodo = id => async (dispatch) => {
  const URL = `https://api.jotform.com/submission/${id}?apikey=b4268d2e7836001e26df451ee96f2b26`
  try {
    await axios.delete(URL, { params: { id } })
    dispatch({ type: types.DELETE_TODO, id })
  } catch (e) {
    console.log(e)
  }
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

export const fetchSubmissions = () => async (dispatch) => {
  const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}&orderby=id`
  const { data } = await axios.get(url)

  const obj = data.content.map(resultSet => ({
    ...resultSet.answers[Object.keys(resultSet.answers)[0]],
    done: resultSet.flag,
    id: resultSet.id,
  }))

  obj.map(resData => dispatch(addTodo(resData.answer, resData.done, resData.id)))
}

export const fetchPOST = text => async (dispatch, getState) => {
  const isItemExists =
    getState()
      .todos.filter(todo => todo.done === false && todo.isDuplicate === false)
      .findIndex(todo => todo.todo === text) > -1

  if (isItemExists !== true) {
    const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}`
    const { data } = await axios({
      method: 'post',
      url,
      params: {
        'submission[3]': text,
      },
    })
    dispatch(addTodo(text, false, data.content.submissionID))
  } else {
    setTimeout(() => {
      dispatch({ type: Uitypes.NOTIFICATION_FALSE, isItemExists })
    }, 1000)
  }
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}
