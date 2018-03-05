import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class componentName extends Component {
  handleCheckItem = (e) => {
    this.props.onDoneItem(e.target.value)
  }

  render() {
    return (
      <Fragment>
        {this.props.todos.map((todo, i) =>
            (todo.done || todo.isItemExists ? null : (
              <li key={i} className="ui-state-default">
                <div className="checkbox">
                  <label>
                    <input
                      value={todo.id}
                      name="todoCheck"
                      type="checkbox"
                      onChange={e => this.handleCheckItem(e)}
                      checked={todo.done}
                    />{' '}
                    {todo.text}
                  </label>
                </div>
              </li>
            )))}
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  todos: state.todos,
})
export default connect(mapStateToProps)(componentName)
