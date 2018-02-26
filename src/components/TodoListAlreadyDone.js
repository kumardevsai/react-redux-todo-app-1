import React, { Component, Fragment } from 'react'

export default class componentName extends Component {
  handleSubmit(e, id) {
    e.preventDefault()
    this.props.deleteTodo(id)
    console.log(id, 'sds')
  }
  render() {
    const todoisNotDone = this.props.todos.filter(todo => todo.done === true)

    return (
      <Fragment>
        {todoisNotDone.map(todo => (
          <li key={todo.id}>
            {todo.todo}
            <button
              onClick={e => this.handleSubmit(e, todo.id)}
              className="remove-item btn btn-default btn-xs pull-right"
            >
              <span className="glyphicon glyphicon-remove" />
            </button>
          </li>
        ))}
      </Fragment>
    )
  }
}
