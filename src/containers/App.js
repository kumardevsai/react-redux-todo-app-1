import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TodoListNotDone from '../components/TodoListNotDone'
import AlreadyDoneList from '../components/AlreadyDoneList'
import * as TodoActions from '../actions'

const App = ({ todos, actions }) => (
  <div className="container">
    <div className="row">
      <TodoListNotDone todos={todos} actions={actions} addTodo={actions.addTodo} />
      <AlreadyDoneList todos={todos} actions={actions} />
    </div>
  </div>
)

const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
