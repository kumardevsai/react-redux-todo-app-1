import React, { Component } from 'react'
import { connect } from 'react-redux'

class TodoFooter extends Component {
  render() {
    const todoIsNotDone = this.props.todos.filter(item => item.done === false && item.isItemExists === false)
    return (
      <div className="todo-footer">
        <strong>
          <span className="count-todos" />
        </strong>{' '}
        {todoIsNotDone.length} Items Left
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
})
export default connect(mapStateToProps)(TodoFooter)
