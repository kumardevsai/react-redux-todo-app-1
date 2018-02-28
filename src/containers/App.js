import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TodoListNotDone from '../components/TodoListNotDone'
import AlreadyDoneList from '../components/AlreadyDoneList'
import * as TodoActions from '../actions'
import * as UiAction from '../actions/UiAction'

const App = ({ todos, actions, notifications }) => (
  <div className="container">
    <div className="row">
      <TodoListNotDone todos={todos} actions={actions} addTodo={actions.addTodo} />
      <AlreadyDoneList notifications={notifications} todos={todos} actions={actions} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  todos: state.todos,
  ui: state.ui,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
  notifications: text => dispatch(UiAction.notifications(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
