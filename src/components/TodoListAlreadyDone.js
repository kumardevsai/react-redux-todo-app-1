import React, { Component, Fragment } from 'react'

export default class componentName extends Component {
  render() {
    const todoisNotDone = this.props.todos.filter(todo => todo.done === true)
    return (
      <Fragment>
        {todoisNotDone.map(todo => (
          <li key={todo.id}>
            {todo.todo}
            <button className="remove-item btn btn-default btn-xs pull-right">
              <span className="glyphicon glyphicon-remove" />
            </button>
          </li>
        ))}
      </Fragment>
    )
  }
}
