import axios from 'axios'

import * as types from '../constants/ActionTypes'
import * as Uitypes from '../constants/UiActionTypes'

axios.defaults.headers.post['content-type'] = 'application/json'

const API_KEY = 'b4268d2e7836001e26df451ee96f2b26'
const FORM_ID = '80582497523969'
const FETCH_SUBMISSIONS = 'https://api.jotform.com/form/'

export const completeTodo = id => dispatch => (
  axios({
    method: 'post',
    url: `https://api.jotform.com/submission/${id}?apikey=${API_KEY}`,
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
      url: `https://api.jotform.com/submission/${data.id}?apikey=${API_KEY}`,
      params: {
        'submission[flag]': isDoneTodo,
      },
    }))
  dispatch({ type: types.COMPLETE_ALL })
}

export const deleteTodo = id => async (dispatch) => {
  const URL = `https://api.jotform.com/submission/${id}?apikey=${API_KEY}`
  try {
    await axios.delete(URL, { params: { id } })
    dispatch({ type: types.DELETE_TODO, id })
  } catch (e) {
    console.log(e)
  }
}

export const fetchSubmissions = () => async (dispatch) => {
  const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}&orderby=id`
  const { data } = await axios.get(url)

  const obj = data.content.map(resultSet => ({
    ...resultSet.answers[3],
    done: resultSet.flag,
    id: resultSet.id,
  }))

  dispatch({
    type: types.ADD_TODO,
    payload: obj,
  })
}

export const fetchPOST = text => async (dispatch, getState) => {
  const isItemExists =
    getState()
      .todos.filter(todo => todo.done === false && todo.isItemExists === false)
      .findIndex(todo => todo.text === text) > -1

  if (isItemExists !== true) {
    const url = `${FETCH_SUBMISSIONS}/${FORM_ID}/submissions?apikey=${API_KEY}`
    const { data } = await axios({
      method: 'post',
      url,
      params: {
        'submission[3]': text,
      },
    })
    const ObjectTodo = [
      {
        text,
        done: false,
        id: data.content.submissionID,
        isItemExists: false,
      },
    ]

    dispatch({
      type: types.ADD_TODO,
      payload: ObjectTodo,
    })
  } else {
    setTimeout(() => {
      dispatch({ type: Uitypes.NOTIFICATION_FALSE, isItemExists })
    }, 1000)
  }
  dispatch({ type: Uitypes.NOTIFICATION_TRUE, isItemExists })
}
