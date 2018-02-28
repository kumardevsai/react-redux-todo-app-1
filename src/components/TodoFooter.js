import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    const todoIsNotDone = this.props.itemLeft.filter(item => item.done === false && item.isDuplicate === false)
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
