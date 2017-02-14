import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'material-ui/List'
import Task from './Task'
import NewTask from './NewTask'
import { createTask, setChecked, deleteTask, reorderTasks } from '../../actions/taskActions'

var Tasks = (props) => {
  const tasks = props.tasks.map((task, i) => (
    <Task key={task._id} index={i} task={task}
          setChecked={props.setChecked}
          deleteTask={props.deleteTask}
          canMoveTask={props.canMoveTask}
          moveTask={props.moveTask}
          reorderTasks={props.reorderTasks}
    />
  ))

  return (
    <List>
      <NewTask onSubmit={props.createTask}/>
      {tasks}
    </List>
  )
}

Tasks.PropTypes = {
  tasks: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  const taskItems = state.tasks.items
  const tasksOrder = state.tasks.tasksOrder

  return {
    tasks: tasksOrder && tasksOrder.map(id => taskItems[id]) || [],

    canMoveTask: (dragIndex, hoverIndex) => {
      const dragTask = taskItems[tasksOrder[dragIndex]]
      const hoverTask =  taskItems[tasksOrder[hoverIndex]]

      return true
      // Return true only if both the todos are not completed
      //return (!('checked' in dragTask && dragTask.checked) &&
      //          !('checked' in hoverTask && hoverTask.checked))
    },

    moveTask: (dragIndex, hoverIndex) => {
      tasksOrder[dragIndex] = [tasksOrder[hoverIndex], tasksOrder[hoverIndex]=tasksOrder[dragIndex]][0];
      return tasksOrder.slice();
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: (values) => dispatch(createTask(values.text)),
    setChecked: (taskId, isChecked) => dispatch(setChecked(taskId, isChecked)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    reorderTasks: (taskIds) => dispatch(reorderTasks(taskIds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Tasks))
