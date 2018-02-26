import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    return (
      <div className="todo-footer">
        <strong>
          <span className="count-todos" />
        </strong> {this.props.itemLeft} Items Left
      </div>
    )
  }
}
