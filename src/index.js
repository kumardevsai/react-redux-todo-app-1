import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'

import App from './containers/App'
import './style/app.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
