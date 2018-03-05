import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class TodoListAlreadyDone extends Component {
  handleSubmit(e, id) {
    e.preventDefault()
    this.props.deleteTodo(id)
  }
  render() {
    const todoisNotDone = this.props.todos.filter(todo => todo.done === true)
    return (
      <Fragment>
        {todoisNotDone.map(todo => (
          <li key={todo.id}>
            {todo.text}
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
const mapStateToProps = state => ({
  todos: state.todos,
})
export default connect(mapStateToProps)(TodoListAlreadyDone)
