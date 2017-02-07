import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { List } from 'material-ui/List'
import Task from './Task'

var Tasks = (props) => {

  const tasks = props.tasks.map(task => (
    <Task key={task._id} task={task} />
  ))

  return (
    <List>
      {tasks}
    </List>
  )
}

Tasks.PropTypes = {
  tasks: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return {
    tasks: Object.keys(state.tasks.items).map(id => state.tasks.items[id])
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
