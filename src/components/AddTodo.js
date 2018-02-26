import React, { Component } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
          className="form-control add-todo"
          placeholder="Add todo"
        />
        <button id="checkAll" className="btn btn-success">
          Mark all as done
        </button>
      </form>
    )
  }
}
