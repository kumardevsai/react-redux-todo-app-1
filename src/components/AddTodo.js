import React, { Component, Fragment } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <Fragment>
        <form onSubmit={this.props.onSubmit}>
          <input
            type="text"
            value={this.props.value}
            onChange={this.props.onChange}
            className="form-control add-todo"
            placeholder="Add todo"
          />
        </form>
        <button onClick={this.props.completeAll} id="checkAll" className="btn btn-success">
          Mark all as done
        </button>
      </Fragment>
    )
  }
}
