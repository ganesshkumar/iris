import React, { Component, PropTypes } from 'react'

import { ItemTypes } from '../../constants/ItemTypes';
import { Tasks } from '../../../imports/api/tasks.js'
import { DragSource, DropTarget } from 'react-dnd';
import { taskSource, collectSource } from './helpers/dragSourceHelper';
import { taskTarget, collectTarget} from './helpers/dropTargetHelper';
import { ListItem } from 'material-ui/List'
import Open from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import Done from 'material-ui/svg-icons/action/done'
import Delete from 'material-ui/svg-icons/navigation/close'

class Task extends Component {
  componentWillMount() {
    ListItem.defaultProps.disableTouchRipple = true;
    ListItem.defaultProps.disableFocusRipple = true;
  }

  render() {
    const { connectDropTarget, connectDragSource, isDragging } = this.props;

    const deleteTask = () => this.props.deleteTask(this.props.task._id)
    const setChecked = () =>
        this.props.setChecked(this.props.task._id, !this.props.task.checked)
    const leftIcon = this.props.task.checked ?
        <Done onClick={setChecked} /> : <Open onClick={setChecked} />

    return connectDragSource(connectDropTarget(
      <div>
        <ListItem
          style={Object.assign({}, this.props.task.checked && styles.done)}
          leftIcon={leftIcon}
          rightIcon={<Delete onClick={deleteTask} />}
          primaryText={this.props.task.text}
        />
      </div>
    ))
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  setChecked: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const styles = {
  done: {
    textDecoration: 'line-through'
  }
}

Task = DragSource(ItemTypes.TASK, taskSource, collectSource)(Task);
Task = DropTarget(ItemTypes.TASK, taskTarget, collectTarget)(Task);

export default Task
