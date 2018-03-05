import React, { Component } from 'react'

import AddTodo from './AddTodo'
import Shortable from './Shortable'
import TodoFooter from './TodoFooter'

class TodoListNotDone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: '',
    }
    this.fetchAPI()
  }

  fetchAPI() {
    this.props.actions.fetchSubmissions()
  }

  handleSubmit = (e) => {
    const { item } = this.state
    if (item !== '') {
      this.props.actions.fetchPOST(item)

      this.setState({
        item: '',
      })
    }
    e.preventDefault()
  }

  handleChange = (e) => {
    const { value } = e.target

    this.setState({
      item: value,
    })
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="todolist not-done">
          <h1>Todos</h1>
          <AddTodo
            value={this.state.item}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            completeAll={this.props.actions.completeAll}
          />
          <hr />
          <ul id="sortable" className="list-unstyled">
            <Shortable onDoneItem={this.props.actions.completeTodo} />
          </ul>
          <TodoFooter />
        </div>
      </div>
    )
  }
}

export default TodoListNotDone
