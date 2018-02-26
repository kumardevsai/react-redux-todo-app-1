import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    return (
      <li>
        Some item{' '}
        <button className="remove-item btn btn-default btn-xs pull-right">
          <span className="glyphicon glyphicon-remove" />
        </button>
      </li>
    )
  }
}
