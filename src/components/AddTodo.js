import React, { Component, Fragment } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <form onSubmit={this.props.onSubmit}>
            <input
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
              className="form-control add-todo"
              placeholder="Add todo"
            />
            <div className="col-md-2">
              <button id="checkAll" className="btn btn-success">
                AddTodo
              </button>
            </div>
          </form>
          <div className="col-md-2">
            <button onClick={this.props.completeAll} id="checkAll" className="btn btn-success">
              Mark all as done
            </button>
          </div>
        </div>
      </Fragment>
    )
  }
}
