import React, { Component, PropTypes } from 'react'

import { Tasks } from '../../../imports/api/tasks.js'
import { ListItem } from 'material-ui/List'
import Open from 'material-ui/svg-icons/toggle/radio-button-unchecked'
import Delete from 'material-ui/svg-icons/navigation/close'

export default class Task extends Component {
  toggleChecked() {
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    return (
      <ListItem
        leftIcon={<Open />}
        rightIcon={<Delete />}
        primaryText={this.props.task.text}
      />
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
