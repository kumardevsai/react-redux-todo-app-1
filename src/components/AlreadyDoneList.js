import React, { Component } from 'react'
import { connect } from 'react-redux'

import TodoListAlreadyDone from './TodoListAlreadyDone'

class AlreadyDoneList extends Component {
  render() {
    return (
      <div className="col-md-6">
        <div className="todolist">
          <h1>Already Done</h1>
          {this.props.ui.duplicate && (
            <img
              className="img-responsive center-block"
              src="https://media1.giphy.com/media/l44QoAtMOGDhYjjVu/giphy.gif"
              alt="duplicate"
            />
          )}
          <ul id="done-items" className="list-unstyled">
            <TodoListAlreadyDone deleteTodo={this.props.actions.deleteTodo} />
          </ul>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  ui: state.ui,
})
export default connect(mapStateToProps)(AlreadyDoneList)
