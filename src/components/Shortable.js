import React, { Component } from 'react'

export default class componentName extends Component {
  handleCheckItem = (e) => {
    this.props.onDoneItem(this.props.todoId)
  }

  render() {
    const { todo, isDone, todoId } = this.props
    return (
      <li className="ui-state-default">
        <div className="checkbox">
          <label>
            <input
              value={todoId}
              name="todoCheck"
              type="checkbox"
              onChange={this.handleCheckItem}
              checked={isDone}
            />{' '}
            {todo}
          </label>
        </div>
      </li>
    )
  }
}
