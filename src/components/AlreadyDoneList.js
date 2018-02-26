import React, { Component } from 'react'
import TodoListAlreadyDone from './TodoListAlreadyDone'

export default class AlreadyDoneList extends Component {
  render() {
    return (
      <div className="col-md-6">
        <div className="todolist">
          <h1>Already Done</h1>
          <ul id="done-items" className="list-unstyled">
            <TodoListAlreadyDone todos={this.props.todos} />
          </ul>
        </div>
      </div>
    )
  }
}
